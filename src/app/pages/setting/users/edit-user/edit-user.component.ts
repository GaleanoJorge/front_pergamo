import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { FormUsersComponent } from '../../../components/form-users/form-users.component';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public routes = [];

  public role: number;
  public title = 'Editar usuario';
  public loading = true;
  public data = null;


  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
    private roleS: RoleBusinessService
  ) {
    this.routes = [];
  }

  ngOnInit(): void {
    this.role = this.route.snapshot.params.roleId;
    this.routes = [
      {
        name: 'Usuarios',
        route: '../../../../../setting/users',
      },
      {
        name: 'Editar',
        route: '../../../../../setting/users/edit/' + this.route.snapshot.params['id'] + '/' + this.role,
      },
    ];
    this.roleS.GetSingle(this.role).then(x => {
      this.title = 'Editar usuario "' + x[0].name + '"';
    }).catch(x => {
      throw new Error('Method not implemented.');
    });
    this.userBS.GetUserById(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
      // this.form.LoadStudent(x).then();
    });
  }

}
