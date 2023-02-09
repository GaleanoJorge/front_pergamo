import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { PatientService } from '../../../business-controller/patient.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { FormUsersComponent } from '../../components/form-users/form-users.component';

@Component({
  selector: 'ngx-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  @Input() id: any = null;
  public routes = [];

  public role = 2;
  public title = 'Editar Paciente';
  public loading = true;
  public data = null;
  public saved;
  public is_checking_in = false;


  @ViewChild('form') form: FormUsersComponent;

  constructor(
    private dialogRef: NbDialogRef<any>,
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
    this.PatientBS.GetUserById(this.id).then(x => {
      this.data = x;
      this.loading = false;
      // this.form.LoadStudent(x).then();
    });
  }

  receiveMessage($event) {
    if($event){
      this.dialogRef.close();
      this.saved();
    }
  }

}
