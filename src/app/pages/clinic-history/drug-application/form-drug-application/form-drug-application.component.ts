import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { ProductDoseService } from '../../../../business-controller/product_dose.service';
import { AssistanceSuppliesService } from '../../../../business-controller/assistance-supplies.service';
import { SuppliesStatusService } from '../../../../business-controller/supplies-status.service';
import { AuthService } from '../../../../services/auth.service';
import { RowHistoryFormat } from '@syncfusion/ej2/documenteditor';

@Component({
  selector: 'ngx-form-drug-application',
  templateUrl: './form-drug-application.component.html',
  styleUrls: ['./form-drug-application.component.scss'],
})
export class FormDrugApplicationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Input() status: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  // public close: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public label: string = '';

  public supplies_status: any[];
  public diagnosis_class: any[];
  public status_id;
  public user_id;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private ChFormulationS: ChFormulationService,
    private route: ActivatedRoute,
    private assistanceSuppliesS: AssistanceSuppliesService,
    private suppliesStatus: SuppliesStatusService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        clock: '',
        observation: '',
      };
    } else {
      if (this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
        this.label = this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.name.toUpperCase();
      } else {
        this.label = this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com.name.toUpperCase();
      }
    }

    this.form = this.formBuilder.group({
      clock: ['', Validators.compose([Validators.required])],
      observation: ['', Validators.compose([Validators.required])],
    });

    this.user_id = this.authS.GetUser().id;

    this.suppliesStatus.GetCollection().then(x => {
      this.supplies_status = x;
      if (this.supplies_status.length != 0) {
        this.status_id = this.supplies_status.find(item => item.name == this.status);
      }
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        await this.assistanceSuppliesS.Update({
          id: this.data.id,
          clock: this.form.controls.clock.value,
          observation: this.form.controls.observation.value,
          supplies_status_id: this.status_id.id,
          ch_record_id: this.record_id,
          type_record_id: this.type_record_id,
          user_incharge_id: this.user_id,
          insume_comercial: this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com_id ? this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com_id : null,
          product_comercial: this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_id ? this.data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_id : null,
        }).then((x) => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
          // this.close();
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });

      } else {
        await this.assistanceSuppliesS.Save({
          ch_record_id: this.record_id,
          type_record_id: this.type_record_id,
          clock: this.form.controls.clock.value,
          observation: this.form.controls.observation.value,
        })
          .then((x) => {
            this.toastService.success('', x);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.success('', x.message);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }


}
