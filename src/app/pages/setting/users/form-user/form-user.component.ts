import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';

@Component({
  selector: 'ngx-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

  public role = 0;

  public routes = [];

  public title = 'Crear usuario';

  constructor(
    private route: ActivatedRoute,
    private roleS: RoleBusinessService) {
  }

  ngOnInit(): void {
    this.role = this.route.snapshot.params.id;
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
    this.roleS.GetSingle(this.role).then(x => {
      this.title = 'Crear usuario "' + x[0].name + '"';
    }).catch(x => {
      throw new Error('Method not implemented.');
    });
  }
}
