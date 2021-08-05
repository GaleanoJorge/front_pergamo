import { Component, OnInit, ViewChild } from '@angular/core';
import { FormUsersComponent } from '../../../components/form-users/form-users.component';
import { ActivatedRoute } from '@angular/router';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss'],
})
export class EditTeacherComponent implements OnInit {
  public routes = [];

  public role = 4;
  public title = 'Editar formador';
  public loading = true;
  public data = null;

  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
  ) {
    this.routes = [
      {
        name: 'Formadores',
        route: '../../../../teacher/teachers',
      },
      {
        name: 'Editar',
        route: '../../../../teacher/teachers/' + this.route.snapshot.params['id'] + '/edit',
      },
    ];
  }

  ngOnInit(): void {
    this.userBS.GetUserById(this.route.snapshot.params['id']).then(x => {
      this.data = x;
      this.loading = false;
      // this.form.LoadStudent(x).then();
    });
  }

}
