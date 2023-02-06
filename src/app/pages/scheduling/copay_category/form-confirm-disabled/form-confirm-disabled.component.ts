import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { MedicalDiaryDaysService } from '../../../../business-controller/medical_diary_days.service';
import { MedicalStatusService } from '../../../../business-controller/medical_status.service';
import { ReasonCancelService } from '../../../../business-controller/reason-cancel.service';
import { RelationshipService } from '../../../../business-controller/relationship.service';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-confirm-disabled',
  templateUrl: './form-confirm-disabled.component.html',
  styleUrls: ['./form-confirm-disabled.component.scss'],
})
export class FormConfirmDisabledComponent implements OnInit {
  @Input() data;
  @Input() CancelScheduling: any = null;
  @Input() desable: any = null;
  @Input() desable_cancel: any = null;
  @Input() desable_agend: any = null;

  public routes = [];
  public loading: boolean = false;
  public isSubmitted: boolean = false;

  public title;
  public textConfirm;
  public saved;
  public body: string = '¿Estas seguro de realizar esta acción?';
  public form: FormGroup;
  public routeBack;

  public status: any[] = [];
  public reason_cancel: any[] = [];

  public input = false;

  public relationships = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private currency: CurrencyPipe,
    private toastrService: NbToastrService,
    private StatusS: StatusBusinessService,
    private medicalStatusS: MedicalStatusService,
    private reasonCancelS: ReasonCancelService,
    public datePipe: DateFormatPipe,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private authService: AuthService,
    private roleS: RoleBusinessService,
    private relationshipS: RelationshipService
  ) {}

  ngOnInit(): void {
    if (this.desable) {
      if (this.data.status_id == 1) {
        this.textConfirm = 'Desactivar';
        this.title = `DESACTIVAR TARIFA CATEGORIA ${
          this.data.category
        } PARA ${this.data.type_contract.name.toUpperCase()} CON VALOR DE: ${this.currency.transform(
          this.data.value
        )}`;
      } else {
        this.textConfirm = 'Activar';
        this.title = `ACTIVAR TARIFA CATEGORIA ${
          this.data.category
        } PARA ${this.data.type_contract.name.toUpperCase()} CON VALOR DE: ${this.currency.transform(
          this.data.value
        )}`;
      }
    } else if (this.CancelScheduling) {
      this.textConfirm = 'Cancelar cita';
      this.title = `Cancelar cita para: ${this.data.patient.nombre_completo}`;

      this.medicalStatusS.GetCollection().then((x) => {
        this.status = x;
      });

      this.reasonCancelS.GetCollection({ status: 1 }).then((x) => {
        this.reason_cancel = x;
      });

      this.relationshipS.GetCollection().then((relationships) => {
        this.relationships = relationships;
      })

      this.form = this.formBuilder.group({
        star_hour: [{ value: this.data.start_hour, disabled: true }],
        finish_hour: [{ value: this.data.finish_hour, disabled: true }],
        status_id: [{ value: this.data.medical_status_id, disabled: true }],
        assistance: [
          {
            value: this.data.medical_diary.assistance.user.nombre_completo,
            disabled: true,
          },
        ],
        procedure_id: [
          {
            value: this.data.services_briefcase.manual_price.name,
            disabled: true,
          },
        ],
        reason_cancel_id: [null, Validators.compose([Validators.required])],
        cancel_description: [null],
        relative_name: [null],
        relationship_id: [null]
      });

      this.onChanges();
    } else if (this.desable_cancel) {
      if (this.data.status_id == 1) {
        this.textConfirm = 'Inactivar motivo de cancelación';
        this.title = `Inactivar cancelación: ${this.data.name}`;
      } else {
        this.textConfirm = 'Activar motivo de cancelación';
        this.title = `Activar cancelación: ${this.data.name}`;
      }
    } else if (this.desable_agend) {
      if (this.data.diary_status_id == 1) {
        this.textConfirm = 'Inactivar agenda medica';
        this.title = `Inactivar agendamiento de: ${this.datePipe.transform(this.data.start_date).split(',', 1) + ' - ' +this.datePipe.transform(this.data.finish_date).split(',', 1)} de ${this.data.start_time}-${this.data.finish_time} \n para ${this.data.procedure.name}`;
        this.body = '¿Estas seguro de realizar esta acción? \n Tenga en cuenta que si hay consultas externas ya diligenciadas no se va a inactivar';
      } else {
        this.textConfirm = 'Activar agendamiento';
        this.title = `Inactivar agendamiento de: ${this.data.start_time} ${this.data.finish_time} del ${this.data.start_date + this.data.finish_date} \n para ${this.data.procedure.name}`;
      }
    }
    
  }
  eventSelections(input) {
    this.input = input;
    if(this.input){
      this.form.controls.relative_name.setValidators(Validators.compose([Validators.required]));
      this.form.controls.relationship_id.setValidators(Validators.compose([Validators.required]));
    }else{
      this.form.controls.relative_name.clearValidators();
      this.form.controls.relationship_id.clearValidators();
    }
  }

  onChanges() {
    this.form.get('reason_cancel_id').valueChanges.subscribe((val) => {
      if (val == 3) {
        this.form.controls.cancel_description.setValidators(
          Validators.compose([Validators.required])
        );
      } else {
        this.form.controls.cancel_description.clearValidators();
        this.form.controls.cancel_description.setErrors(null);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  DeleteAction() {
    this.loading = true;
    this.close();
    this.desable(this.data);
  }

  cancelSchedule() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.medicalDiaryDaysS
          .ChangeStatus(this.data.id, {
            id: this.data.id,
            status_id: 5,
            reason_cancel_id: this.form.controls.reason_cancel_id.value,
            cancel_description: this.form.controls.cancel_description.value,
            user_cancel_id: this.authService.GetUser().id,
            relative_name: this.form.controls.relative_name.value,
            relationship_id: this.form.controls.relationship_id.value
          })
          .then((x) => {
            this.toastrService.success('', x.message);
            this.dialogRef.close();
            if (this.CancelScheduling) {
              this.CancelScheduling();
            }
          })
          .catch((x) => {
            this.toastrService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  toggleActivity() {
    this.loading = true;
    this.close();
    this.desable_cancel(this.data);
  }

  toggleScheduling() {
    this.loading = true;
    this.close();
    this.desable_agend(this.data);
  }
}
