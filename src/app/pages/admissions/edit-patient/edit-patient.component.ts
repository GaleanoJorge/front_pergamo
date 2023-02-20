import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../business-controller/patient.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { FormUsersComponent } from '../../components/form-users/form-users.component';

@Component({
  selector: 'ngx-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  public routes = [];

  public role = 2;
  public title = 'Editar Paciente';
  public loading = true;
  public data = null;

  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
    private PatientBS: PatientService
  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../../../admissions/list',
      },
      {
        name: 'Editar',
        route: '../../../../admissions/patients/' + this.route.snapshot.params['id'] + '/edit',
      },
    ];
  }

  ngOnInit(): void {
    this.PatientBS.GetUserById(this.route.snapshot.params['id']).then(x => {
      this.data = x;
      this.loading = false;
      // this.form.LoadStudent(x).then();
    });
  }

}
