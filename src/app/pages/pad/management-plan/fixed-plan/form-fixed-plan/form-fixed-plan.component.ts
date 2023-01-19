import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AdmissionsService } from '../../../../../business-controller/admissions.service';
import { FixedAddService } from '../../../../../business-controller/fixed-add.service';
import { FixedNomProductService } from '../../../../../business-controller/fixed-nom-product.service';
import { FixedStockService } from '../../../../../business-controller/fixed-stock.service';
import { PatientService } from '../../../../../business-controller/patient.service';
import { ServicesBriefcaseService } from '../../../../../business-controller/services-briefcase.service';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-fixed-plan',
  templateUrl: './form-fixed-plan.component.html',
  styleUrls: ['./form-fixed-plan.component.scss']
})
export class FormFixedPlanComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() admissions_id: any = null;
  @Input() user: any = null;


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public fixed_type_id: any[];
  public responsible_user: any[];
  public fixed_nom_product_id: any[];
  // public user = null;
  public procedure_id: any;
  public procedure;
  public product_id;
  public own_fixed_user_id;
  public admissions;


  constructor(
    private formBuilder: FormBuilder,
    private FixedAddS: FixedAddService,
    private toastService: NbToastrService,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private FixedNomProductS: FixedNomProductService,
    private UserBusinessS: UserBusinessService,
    private patienBS: PatientService,
    private admissionsS: AdmissionsService,

  ) {
  }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_nom_product_id: '',
        procedure_id: '',
      };
      
    }

    this.form = this.formBuilder.group({
      fixed_nom_product_id: [this.data.fixed_nom_product_id],
      procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
    });
    this.UserBusinessS.GetUser().then(x => {
      this.own_fixed_user_id = x;
    });
    this.FixedNomProductS.GetCollection().then(x => {
      this.fixed_nom_product_id = x;
    });
  //   this.admissionsS.GetByPacient(this.user.id, 1).then(x => {
  //     this.admissions = x;
  //   });
  //  this.patienBS.GetUserById(this.user).then(x => {
  //     this.user = x;
  //   });


  this.serviceBriefcaseS.GetByBriefcase({ type: '4'}, this.user.admissions[this.user.admissions.length - 1].briefcase_id).then(x => {
    this.procedure = x;
  });
  }

  saveCode(e): void {
    var localidentify = this.procedure.find(item => item.manual_price.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.controls.procedure_id.setErrors(null);

    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }


  saveCode1(e): void {
    var localidentify = this.fixed_nom_product_id.find(item => item.name == e);

    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.form.controls.fixed_nom_product_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.FixedAddS.Update({
          id: this.data.id,
          request_amount: 1,
          fixed_nom_product_id: this.product_id,
          status: 'PATIENT',
          admissions_id: this.admissions_id,
          procedure_id: this.procedure_id,
          own_fixed_user_id: this.own_fixed_user_id.id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {

        this.FixedAddS.Save({
          request_amount: 1,
          fixed_nom_product_id: this.product_id,
          status: 'PATIENT',
          admissions_id: this.admissions_id,
          procedure_id: this.procedure_id,
          own_fixed_user_id: this.own_fixed_user_id.id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ fixed_nom_product_id: '', procedure_id: ''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }
}


