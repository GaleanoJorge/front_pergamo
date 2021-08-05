import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public isSubmitted = false;
  public messageError = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  async ResetPassword() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      await this.authService.ResetPasswordForToken({
        token: this.route.snapshot.params.token,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        password_confirmation: this.form.controls.password_confirmation.value,
      });
      await this.router.navigateByUrl('/auth');
    } catch (e) {
      this.messageError = e;
    }
  }
}
