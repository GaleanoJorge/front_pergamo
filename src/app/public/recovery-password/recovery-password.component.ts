import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserBusinessService } from '../../business-controller/user-business.service';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'ngx-find-email',
    templateUrl: './recovery-password.component.html',
    styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {

   
  public resetForm: FormGroup;
  public isSubmitted = false;
  public isSubmitted2 = false;
  public resetPasswordForm = false;
  public messageError: string = null;
  inputItemFormControl = new FormControl();

    constructor(private userBS: UserBusinessService, 
        private toastrService: NbToastrService, 
        private authService: AuthService,
        private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {

        this.resetForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
          });

     }
     Search() {}
     resetPassword() {
         
           this.toastrService.success('', 'Restableciendo contraseña...');
           this.authService.ResetPassword(this.inputItemFormControl.value).then().catch(x => {
             if (x == 'Se ha enviado un correo electrónico para que pueda restablecer la contraseña')
               this.toastrService.success('', x);
             this.resetPasswordForm = false;
             this.messageError = null;
           });
         
       
       
      }
    
    

}
