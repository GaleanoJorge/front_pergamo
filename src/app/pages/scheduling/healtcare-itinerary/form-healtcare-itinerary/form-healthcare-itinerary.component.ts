import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { disable } from '@rxweb/reactive-form-validators';
import { BriefcaseService } from '../../../../business-controller/briefcase.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { ContractService } from '../../../../business-controller/contract.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { MedicalDiaryDaysService } from '../../../../business-controller/medical_diary_days.service';
import { MedicalStatusService } from '../../../../business-controller/medical_status.service';

@Component({
  selector: 'ngx-form-healthcare-itinerary',
  templateUrl: './form-healthcare-itinerary.component.html',
  styleUrls: ['./form-healthcare-itinerary.component.scss'],
})
export class FormHealthcareItineraryComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() patientData: any = null;
  @Input() cups_selected_id: any = null;

  @Input() assistance: any = null;
  @Input() disabled: boolean = false;
  @Input() onlyView: boolean = false;
  @Input() id: number = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public filteredControlOptions$: Observable<string[]>;
  public procedures: any[] = [];
  public briefcase: any[] = [];
  public eps: any[] = [];
  public contract: any[] = [];
  public medical_status: any[] = [];
  public procedure_id;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastService: NbToastrService,
    private procedureS: ProcedureService,
    private BriefcaseS: BriefcaseService,
    private ServiceBriefcaseS: ServicesBriefcaseService,
    private ContractS: ContractService,
    private companyS: CompanyService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private medicalStatusS: MedicalStatusService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        state_id: '',
        eps: '',
        telemedicine: '',
        contract_id: '',
        briefcase_id: '',
        procedure_id: '',
      };
    }

    if (this.data.medical_status_id == 1) {
      this.title = 'Agendamiento de:';
    } else if (this.data.medical_status_id == 2) {
      this.title = 'Reservación para:';
      this.disabled = true;
    } else if (this.data.medical_status_id == 3) {
      this.title = 'Confirmación para:';
      this.disabled = true;
    }

    this.form = this.formBuilder.group({
      star_hour: [this.data.start_hour],
      finish_hour: [this.data.finish_hour],
      state_id: [this.data.medical_status_id == 1 ? 2 :this.data.medical_status_id , Validators.compose([Validators.required])],
      eps_id: [this.data.eps_id],
      telemedicine: [this.data.telemedicine],
      contract_id: [this.data.contract ? this.data.contract.name : '' , Validators.compose([Validators.required])],
      briefcase_id: [this.data.briefcase ? this.data.briefcase.name : '', Validators.compose([Validators.required])],
      procedure_id: [{value : this.data.services_briefcase ? this.data.services_briefcase.manual_price.name : '', disabled: this.onlyView}, Validators.compose([Validators.required])],
    });

    this.companyS
      .GetCollection({ eps: 1, company_category_id: 1 })
      .then((x) => {
        this.eps = x;
      });

    this.medicalStatusS.GetCollection().then((x) => {
      this.medical_status = x;
    });
    this.onChanges();
  }

  returnProcedure(){

  }

  private filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.procedures.filter(
      (optionValue) =>
        optionValue.manual_price.own_code.includes(filterValue) ||
        optionValue.manual_price.procedure.code.includes(filterValue) ||
        optionValue.manual_price.procedure.name.includes(filterValue)
    );
  }

  onFilter() {
    this.filteredControlOptions$ = this.form
      .get('procedure_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString))
      );
  }

  onSelectionChange($event) {
    // console.log($event)
    var localidentify = this.procedures.find(
      (item) => item.manual_price.procedure.name == $event
    );
      if(!this.disabled && !this.onlyView){
        if (localidentify) {
          this.procedure_id = localidentify.id;
        } else {
          this.procedure_id = null;
          this.toastService.warning(
            '',
            'Debe seleccionar un diagnostico de la lista'
          );
          this.form.controls.procedure_id.setErrors({ incorrect: true });
        }
      }
  }

  close() {
    this.dialogRef.close();
  }

  onChanges() {
    this.form.get('eps_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.contract = [];
      } else {
        this.ContractS.GetCollection({ company_id: val }).then((x) => {
          this.contract = x;
        });
      }
      this.form.patchValue({
        contract_id: '',
      });
    });

    this.form.get('contract_id').valueChanges.subscribe((val) => {
      if (val == '') {
        this.briefcase = [];
      } else {
        this.GetBriefcase(val).then();
      }
      this.form.patchValue({
        briefcase_id: '',
      });
    });

    this.form.get('briefcase_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.procedures = [];
      } else {
        this.Getprocedures(val).then();
      }
      this.form.patchValue({
        procedures: '',
      });
    });
  }

  GetBriefcase(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return this.BriefcaseS.GetBriefcaseByContract(contract_id).then((x) => {
      this.briefcase = x;
      return Promise.resolve(true);
    });
  }

  Getprocedures(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.ServiceBriefcaseS.GetProcedureByBriefcase(briefcase_id, {
      cups_selected_id: this.cups_selected_id,
    }).then((x) => {
      if (x.length > 0) {
        this.procedures = x;
        this.filteredControlOptions$ = of(this.procedures);
        this.onFilter();
      } else {
        this.toastService.warning(
          '',
          'CUPS no asociado portafolio, comuniquese con personal de contratación'
        );
        this.form.controls.procedure_id.setErrors({ incorrect: true });
      }
      return Promise.resolve(true);
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.Id) {
        this.medicalDiaryDaysS
          .Update({
            id: this.data.Id,
            state_id: this.form.controls.state_id.value,
            eps_id: this.form.controls.eps_id.value,
            contract_id: this.form.controls.contract_id.value,
            is_telemedicine: this.form.controls.telemedicine.value,
            briefcase_id: this.form.controls.briefcase_id.value,
            service_briefcase_id: this.procedure_id,
            patient_id: this.patientData.id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.dialogRef.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.NonWorkingDaysS.Save({
          day: this.form.controls.day.value,
          description: this.form.controls.description.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.dialogRef.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }
}
