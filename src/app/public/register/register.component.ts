import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormUsersComponent} from '../../pages/components/form-users/form-users.component';
import {UserBusinessService} from '../../business-controller/user-business.service';
import {AuthService} from '../../services/auth.service';
import { environment } from '../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public routes = [];
  public role = 5;
  public title = '';
  public isPublic = true;
  public routeBack = null;
  public redirectTo = null;
  public loading = true;
  public data = null;
  private endPointCAS = environment.cas;
  private endPointService = environment.url_service;
  public messageError: string = null;

  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    
    let user;
   // user = this.authService.GetUser();
   
    if (this.route.snapshot.params.role === 'students') {
      
      this.role = 5;
      this.routes = [
        {
          name: 'Inscripción',
          route: '/public/inscriptions/students',
        },
        {
          name: 'Registrar discente',
          route: '/public/register/students',
          queryParams: this.route.snapshot.queryParams,
        },
      ];
      this.routeBack = '/auth';
      this.redirectTo = '/public/register/' + this.route.snapshot.params.role + '/success';
      if(this.route.snapshot.queryParams.ticket){
        let ticket = this.route.snapshot.queryParams.ticket;
        let course_id = this.route.snapshot.queryParams.course_id;
        let register = this.route.snapshot.queryParams.register;
        console.log(this.route);
        
        const url = this.endPointCAS+'serviceValidate?service='+this.endPointService+'/public/register/students?register='+register+'%26course_id='+course_id+'&ticket='+ticket;
        //const url = this.endPointCAS+'serviceValidate?service=http://localhost:4200/public/register/students?register=students%26course_id=9&ticket='+ticket;
        console.log(url);
        let parser = new DOMParser();
        this.http.get(url, { responseType: 'text' }).subscribe(
        (response: any) => {
        
        let xml = parser.parseFromString( response, "text/xml");
        var obj = xml;
        console.log('============= 200 =======================');
        console.log(xml);
        var atributos = xml.getElementsByTagName("cas:attributes");
        console.log(atributos);
        let id = null;
        let mail = null;
        var idt = xml.getElementsByTagName("cas:id");
        var mailt = xml.getElementsByTagName("cas:user");
       id=idt[0].textContent;
       mail=mailt[0].textContent;
       
       console.log( 'entra1');
       if(atributos.length > 0){
        console.log( 'entra2');
       this.authService.APIToken(mail, 'test', id).then(x => {
        console.log( 'entra2');
         
        this.userBS.GetUser().then(async x => {
          if (x && x.roles.length > 0) {
  
            this.authService.SaveUser(x);
  
            user = this.authService.GetUser();
            console.log( user);
            if (!user) {
              this.title = 'Registrar nuevo discente';
              this.loading = false;
            } else {
              this.title = 'Actualizar datos';
              this.userBS.GetUserById(user.id).then(x => {
                // this.form.LoadStudent(x).then();
                this.data = x;
                this.loading = false;
              });
            }
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
        console.log('====================================');
        },
        (error: any) => {
        
        let xml = parser.parseFromString( error, "text/xml");
        console.log('============== 400 ======================');
        console.log(xml);
        console.log('====================================');
        }
        )
      }else{
        if (!user) {
          this.title = 'Registrar nuevo discente';
          this.loading = false;
        } else {
          this.title = 'Actualizar datos';
          this.userBS.GetUserById(user.id).then(x => {
            // this.form.LoadStudent(x).then();
            this.data = x;
            this.loading = false;
          });
        }
      }
      

    } else {
      this.role = 4;
      this.title = 'Registar nuevo formador';
      this.routeBack = '/auth';
      this.loading = false;
    }
  }

}
