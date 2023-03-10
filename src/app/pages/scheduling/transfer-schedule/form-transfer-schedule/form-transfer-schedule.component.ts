import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { MedicalDiaryService } from '../../../../business-controller/medical-diary.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { DaysService } from '../../../../business-controller/days.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { json } from '@rxweb/reactive-form-validators';
import { BedService } from '../../../../business-controller/bed.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { FlatService } from '../../../../business-controller/flat.service';
import { itemHighlight } from '@syncfusion/ej2/maps';
import { User } from '../../../../models/user';
import { Campus } from '../../../../models/campus';
import { Flat } from '../../../../models/flat';
import { Pavilion } from '../../../../models/pavilion';
import { Office } from '../../../../models/office';
import { CampusService } from '../../../../business-controller/campus.service';
import { AssistanceService } from '../../../../business-controller/assistance.service';
import { Bed } from '../../../../models/bed';
import { Procedure } from '../../../../models/procedure';

@Component({
  selector: 'ngx-form-transfer-schedule',
  templateUrl: './form-transfer-schedule.component.html',
  styleUrls: ['./form-transfer-schedule.component.scss'],
})
export class FormTransferScheduleComponent implements OnInit {
  
  public title: string;
  public userOrigin: User;
  public user: User;
  public procedure: Procedure;
  public startDate: string;
  public finishDate: string;
  public startHour: string;
  public finishHour: string;
  public scheduleData;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public procedure_id: any = null;
  public inputFormControl: FormControl;
  public pavilions: any[] = [];
  public calendar_array: string[] = [];

  public users: User[] = [];
  public filteredAssistances: User[] = [];

  public campus: Campus[];
  public flats: Flat[];
  public pavillions: Pavilion[];
  public offices: Bed[];

  public isLoaded = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private assistanceS: AssistanceService,
    private CampusS: CampusService,
    private PavilionS: PavilionService,
    private toastService: NbToastrService,
    private bedS: BedService,
    private flatS: FlatService,
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      user_id: ['', Validators.compose([Validators.required])],
      campus_id: ['', Validators.compose([Validators.required])],
      flat_id: ['', Validators.compose([Validators.required])],
      pavilion_id: ['', Validators.compose([Validators.required])],
      office_id: ['', Validators.compose([Validators.required])],
    });

    this.form.controls.user_id.valueChanges.subscribe((userId) => {
      this.filteredAssistances = this.getFilteredAssistances(userId);
    })

    this.form.controls.campus_id.valueChanges.subscribe((campusId) => {
      this.loadFlats(campusId);
      this.form.controls.flat_id.setValue('');
      this.form.controls.pavilion_id.setValue('');
      this.form.controls.office_id.setValue('');
    })

    this.form.controls.flat_id.valueChanges.subscribe((flatId) => {
      this.loadPavilion(flatId);
      this.form.controls.pavilion_id.setValue('');
      this.form.controls.office_id.setValue('');
    })

    this.form.controls.pavilion_id.valueChanges.subscribe((pavilionId) => {
      this.loadOffice(pavilionId, this.convertDates(this.scheduleData));
      this.form.controls.office_id.setValue('');
    })

    this.loadAssistances();
    this.loadCampus();

    this.isLoaded = true;

  }

  private getCompleteName(user) {
    return ((user.firstname == null) ? '' : user.firstname) + ' ' + ((user.middlefirstname == null) ? '' : user.middlefirstname) + ' ' + ((user.lastname == null) ? '' : user.lastname) + ' ' + ((user.middlelastname == null) ? '' : user.middlelastname);
  }

  public getFilteredAssistances(val) {

    return this.users.filter((user) => (this.getCompleteName(user) + ' - ' + user.identification).includes(val.toUpperCase()));

  }

  checkAssistance($event, value) {
    if ($event.relatedTarget != null && $event.relatedTarget.className.includes("assistanceAutocompleteOption")) {
      return;
    }
    if (this.form.controls.user_id.value == null || this.form.controls.user_id.value == '') {
      return;
    }
    var filter = this.users.find((assistanceOne) => this.getCompleteName(assistanceOne) == value);
    if (!filter) {
      this.form.controls.user_id.setValue('');
    }
  }

  private loadAssistances() {
    this.assistanceS.GetExternalAssistanceUsersTransfer({
      userId: this.userOrigin.id,
      startDate: this.startDate + ' ' + this.startHour,
      finishDate: this.finishDate + ' ' + this.finishHour,
      procedure_id: this.procedure.id
    })
    .then((users) => {
      this.users = users;
      this.filteredAssistances = users;
    });
  }

  private loadCampus() {
    this.CampusS.GetCollection().then((campus) => { this.campus = campus });
  }

  private loadFlats(campus_id) {
    if (!campus_id || campus_id === '') return Promise.resolve(false);
    return this.flatS
      .GetFlatByCampus(campus_id)
      .then((x) => {
        this.flats = x;

        return Promise.resolve(true);
      });
  }

  private loadPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id).then((x) => {
      this.pavilions = x;

      return Promise.resolve(true);
    });
  }

  private loadOffice(pavilion_id, dateRanges) {
    if (!pavilion_id || pavilion_id === '') return Promise.resolve(false);
    return this.bedS
      .getAvailableConsultories({
        pavilionId: pavilion_id,
        dateRanges: JSON.stringify(dateRanges)
      })
      .then((x) => {
        this.offices = x;

        return Promise.resolve(true);
      });
  }

  private convertDates(dates){
    return dates.map(date => { return {"startDate": date.start_hour, "finishDate": date.finish_hour}});
  }

  onSelectionChange($event) {
    if ($event == '') { return false; }
    this.user = this.users.find((user) => this.getCompleteName(user) == $event);
  }

  close() {
    this.dialogRef.close();
  }

  transfer() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.assistanceS.TransferSchedule({
        userIdOrigin: this.userOrigin.id,
        userIdFinal: this.user.id,
        startDate: this.startDate + ' ' + this.startHour,
        finishDate: this.finishDate + ' ' + this.finishHour,
        campusId: this.form.controls.campus_id.value,
        flatId: this.form.controls.flat_id.value,
        pavilionId: this.form.controls.pavilion_id.value,
        officeId: this.form.controls.office_id.value,
        procedureId: this.procedure.id,
      }).then((x) => {
        this.toastService.success('', x.message);
        this.close();
      }).catch((x) => {
        this.isSubmitted = false;
        this.loading = false;
        this.toastService.warning('', x.message);
        this.loadAssistances();
      })
    }else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

  }
}
