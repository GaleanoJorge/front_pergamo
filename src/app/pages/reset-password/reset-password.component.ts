import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserBusinessService} from '../../business-controller/user-business.service';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted = false;
  public messageError: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    private toastService: NbToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
    });
  }

  changePassword() {
    this.isSubmitted = true;
    if (!this.loginForm.invalid) {
      const data = this.loginForm.value;

      this.userBS.ChangePassword(data).then(x => {
        this.toastService.success('', x.message);
        this.router.navigateByUrl('auth/login');
      }).catch(x => {
        this.messageError = x;
      });
    }
  }

  get errors() {
    const e = [];
    if (this.messageError && this.messageError.error
      && this.messageError.error.data && this.messageError.error.data.errors) {
      const errors = this.messageError.error.data.errors;
      const errorKeys = Object.keys(errors);

      errorKeys.map(key => {
        errors[key].map(er => {
          e.push(er);
        });
      });
    }

    return e;
  }

}
