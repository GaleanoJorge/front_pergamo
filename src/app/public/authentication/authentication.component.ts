import {Attribute, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';  
import { NbAlertComponent } from '@nebular/theme';
import { ServiceObject } from '../../models/service-object';
import { ItemRolePermissionBusinessService } from '../../business-controller/item-role-permission-business.service';
import { UserBusinessService } from '../../business-controller/user-business.service';



@Component({
  template: `
    <div><img src="assets/skins/lightgray/img/loader.gif" alt="Enseñame" class="img-fluid img-login">
    </div>
  `,
})
export class AuthenticationComponent implements OnInit {
 
  private endPointCAS = environment.cas;
  private endPointService = environment.url_service;
  
  public messageError: string = null;
  public xmlItems: any;
  
  public register: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private itemBS: ItemRolePermissionBusinessService,
    private userBS: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.Authetication();
  }

  Authetication() {
    console.log( );
    let i=0;
    let serviceObj = new ServiceObject();
    if(this.route.snapshot.queryParams.ticket){
      let ticket = this.route.snapshot.queryParams.ticket;
      const url = this.endPointCAS+'serviceValidate?service='+this.endPointService+'/public/validate-login&ticket='+ticket;
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
     
     console.log( mailt);
     if(atributos.length > 0){
       
     this.authService.APIToken(mail, 'test', id).then(x => {
      
       
      this.userBS.GetUser().then(async x => {
        if (x && x.roles.length > 0) {

          this.authService.SaveUser(x);

          await this.itemBS.GetCollection(this.authService.GetRole());

          // @ts-ignore
          if (this.register === 'students' && this.route.snapshot.queryParams.course_id) {
            console.log("Register");
            this.router.navigate(['/public/register/' + this.register], {
              queryParams: this.route.snapshot.queryParams,
            });
          } else {
            if (this.authService.GetRole() === 4) {
              this.router.navigateByUrl('/pages/personal-information');
            } else {
              this.router.navigateByUrl('/pages');
            }
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
    }
  }

  
  
}
