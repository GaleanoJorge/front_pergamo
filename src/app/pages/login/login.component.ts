import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserOriginService } from '../../business-controller/user-origin.service';
import { UserBusinessService } from '../../business-controller/user-business.service';
import { UserCampusBusinessService } from '../../business-controller/user-campus.service';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ItemRolePermissionBusinessService } from '../../business-controller/item-role-permission-business.service';
import { environment } from '../../../environments/environment';
import { NbLoginComponent } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sso : boolean;
  public loginForm: FormGroup;
  public resetForm: FormGroup;
  public isSubmitted = false;
  public isSubmitted2 = false;
  public resetPasswordForm = false;
  public messageError: string = null;
  public campus: any[];
  public environmentInt: boolean;
  public app_version: string;
  private endPointCAS = environment.cas;
  private serviceurl = environment.url_service;
  private type_login = environment.login_sso;

  public register: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userOriginBS: UserOriginService,
    private userBS: UserBusinessService,
    private userCampusBS: UserCampusBusinessService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private itemBS: ItemRolePermissionBusinessService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    
    if(this.type_login == 'true'){
    this.sso = true;
    let path;
    this.route.url.subscribe(values => {
        path = values[0].path;
    });
    if(path == 'logout'){
     
      this.authService.LogOut();
      const url = this.endPointCAS+'logout';
    location.href = url;

    }else {
      this.authService.LogOut();
      let course_id = this.route.snapshot.queryParams.course_id;
        let register = this.route.snapshot.queryParams.register;
        if( this.route.snapshot.queryParams.register && this.route.snapshot.queryParams.course_id ){
      
      const url = this.endPointCAS+'login?service='+this.serviceurl+'/public/register/students?register='+register+'%26course_id='+course_id;
      location.href = url;    
    }else{
          
      const url = this.endPointCAS+'login?service='+this.serviceurl+'/public/validate-login';
      location.href = url;
        }
    
    }
  }else{
    this.sso = false;
    this.environmentInt = environment.production;
    this.app_version = environment.app_version;
    this.authService.LogOut();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
    });

    this.register = this.route.snapshot.queryParams.register;
    this.route.url.subscribe(values => {
      if (values[1]) {
        this.userBS.verifyUser(values[1]).then(
          (response: any) => {
            if (!response.status) {
              this.toastrService.danger('', response.message);
            } else {
              this.toastrService.success('', response.message);
            }
          }).catch(
            error => {
              this.toastrService.danger('', error);
            },
          );
      }
    });
  }
  }

  login() {
    this.isSubmitted = true;
    if (!this.loginForm.invalid) {
      this.authService.Login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(x => {
        this.userBS.GetUser().then(async x => {
          if (x && x.roles.length > 0) {

            this.authService.SaveUser(x);

            await this.itemBS.GetCollection(this.authService.GetRole());
            
             this.campus= await this.userCampusBS.GetCollection(this.authService.GetUser().id);
            
          } else {
            this.messageError = 'No tiene ningún rol asociado';
          }
        }).catch(x => {
          this.messageError = null;
        });
      }).catch(x => {
        this.messageError = null;
      });
    }
  }

  chargeCampus(){
      // @ts-ignore
      if (this.authService.GetRole() === 4) {
      this.router.navigateByUrl('/pages/personal-information');
      } else {
      this.router.navigateByUrl('/pages');
      setTimeout('window.location.reload()',200);
    }
  }

  ChangeCampus(value){
    localStorage.setItem('campus', value.toString());
  }
  resetPassword() {
    this.isSubmitted2 = true;
    if (!this.resetForm.invalid) {
      this.toastrService.success('', 'Restableciendo contraseña...');
      this.authService.ResetPassword(this.resetForm.controls.email.value).then().catch(x => {
        if (x == 'Se ha enviado un correo electrónico para que pueda restablecer la contraseña')
          this.toastrService.success('', x);
        this.resetPasswordForm = false;
        this.messageError = null;
      });
    }
  }
}
