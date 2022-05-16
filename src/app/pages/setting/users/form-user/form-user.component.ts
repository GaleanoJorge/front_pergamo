import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';

@Component({
  selector: 'ngx-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

  public role = 0;
  @Input() role2;
  @Input() isTH;
  @Input() saved;


  public routes = [];

  public title = 'Crear usuario';
  public routeBack ;

  

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private route: ActivatedRoute,
    private roleS: RoleBusinessService) {
  }

  ngOnInit(): void {
    this.role = this.route.snapshot.params.id==undefined ? this.role2:this.route.snapshot.params.id;
    if(this.role2){
      this.routes=null;
      this.routeBack=null;
    }else{
      this.routeBack='/pages/setting/users';
    this.routes = [
      {
        name: 'Usuarios',
        route: '../../../../setting/users',
      },
      {
        name: 'Crear',
        route: '../../../../setting/users/create/' + this.role,
      }
    ];
  }
    this.roleS.GetSingle(this.role).then(x => {
      this.title = 'Crear usuario "' + x[0].name + '"';
    }).catch(x => {
      throw new Error('Method not implemented.');
    });
  }

  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    if($event==true){
      this.saved();
      this.close();
    }
  }
}
