import { Component, OnInit, ViewChild } from '@angular/core';
import { UserBusinessService } from '../../business-controller/user-business.service';
import { AuthService } from '../../services/auth.service';
import { FormUsersComponent } from '../components/form-users/form-users.component';

@Component({
  selector: 'ngx-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {

  public routes = [
    {
      name: 'Información personal',
      route: '/pages/persona-information',
    },
  ];
  public role = 5;
  public title = 'Actualizar información personal';
  public isPublic = false;
  public loading = true;
  public data = null;

  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private userBS: UserBusinessService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.role = this.authService.GetRole();
    const user = this.authService.GetUser();

    this.userBS.GetUserById(user.id).then(x => {
      this.data = x;
      this.loading = false;
      // this.form.LoadStudent(x).then();
    });
  }

}
