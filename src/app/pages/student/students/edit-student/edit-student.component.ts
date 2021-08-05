import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { FormUsersComponent } from '../../../components/form-users/form-users.component';

@Component({
  selector: 'ngx-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  public routes = [];

  public role = 5;
  public title = 'Editar discente';
  public loading = true;
  public data = null;


  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
  ) {
    this.routes = [
      {
        name: 'Discentes',
        route: '../../../../student/students',
      },
      {
        name: 'Editar',
        route: '../../../../student/students/' + this.route.snapshot.params['id'] + '/edit',
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
