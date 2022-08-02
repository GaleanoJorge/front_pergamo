import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../../../business-controller/bank.service';
import { AccountTypeService } from '../../../../business-controller/account-type.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';
import { SourceRetentionService } from '../../../../business-controller/source-retention.service';
import { environment } from '../../../../../environments/environment.prod';
import { TaxValueUnitService } from '../../../../business-controller/tax-value-unit.service';
import { CurrencyPipe } from '@angular/common';
import { FormRejectAccountComponent } from './form-reject-account/form-reject-account.component';


@Component({
  selector: 'ngx-form-rent-relief',
  templateUrl: './form-rent-relief.component.html',
  styleUrls: ['./form-rent-relief.component.scss']
})
export class FormRentReliefComponent implements OnInit {

  @Input() title: string;
  @Input() procedence: number;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_bill: any[];
  public observation;
  public parentData;
  public show_table = false;
  public path_file;
  public button_save = 'Guardar';

  public source_retention;

  public gross_value_activities_format = this.currency.transform(0);
  public salud_format = this.currency.transform(0);
  public arl_format = this.currency.transform(0);
  public pension_format = this.currency.transform(0);
  public ingresos_no_constitutivos_format = this.currency.transform(0);
  public sub_total_1_format = this.currency.transform(0);
  public deduc1_format = this.currency.transform(0);
  public deduc2_format = this.currency.transform(0);
  public deduc3_format = this.currency.transform(0);
  public total_deduc_format = this.currency.transform(0);
  public sub_total_2_format = this.currency.transform(0);
  public rent1_format = this.currency.transform(0);
  public rent2_format = this.currency.transform(0);
  public rent3_format = this.currency.transform(0);
  public total_renta_format = this.currency.transform(0);
  public sub_total_3_format = this.currency.transform(0);
  public Renta_de_Trabajo_Exenta_format = this.currency.transform(0);
  public sub_total_4_format = this.currency.transform(0);
  public Cifra_control1_format = this.currency.transform(0);
  public Cifra_control2_format = this.currency.transform(0);
  public Cifra_control3_format = this.currency.transform(0);
  public Ingreso_Base_format = this.currency.transform(0);
  public Ingreso_laboral_gravado_en_UVT_format = 0;
  public Retencion_por_aplicar_format = this.currency.transform(0);
  public Rete_ica_format = this.currency.transform(0);

  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private SourceRetentionS: SourceRetentionService,
    private toastService: NbToastrService,
    private TaxValueUnitS: TaxValueUnitService,
    private BankS: BankService,
    private AccountTypeS: AccountTypeService,
    private AccountReceivableS: AccountReceivableService,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    if (this.procedence == 0) {
      this.parentData = {
        selectedOptions: [],
        procedence: this.procedence,
        entity: 'source_retention_type',
        customData: 'source_retention_type',
      };
      this.show_table = true;
    } else if (this.procedence == 1) {
      this.parentData = {
        selectedOptions: [],
        procedence: this.procedence,
        entity: 'source_retention?account_receivable_id=' + this.data.id,
        customData: 'source_retention',
      };
      this.show_table = true;
      this.button_save = 'Aplicar Retenciones';
    }

    if (!this.data) {
    } else {
      this.path_file = environment.storage + this.data.file_payment;
    }

    if (this.procedence == 1) {
      this.SourceRetentionS.GetByAccountReceivableId(this.data.id).then(x => {
        this.source_retention = x;
        this.applySourceRetention();
      });
    }

    this.form = this.formBuilder.group({

    });
  }



  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  applySourceRetention() {
    this.gross_value_activities_format = this.source_retention.gross_value_activities ? this.currency.transform(this.source_retention.gross_value_activities) : this.currency.transform(0);
    this.salud_format = this.currency.transform(this.source_retention.salud);
    this.arl_format = this.currency.transform(this.source_retention.arl);
    this.pension_format = this.currency.transform(this.source_retention.pension);
    this.ingresos_no_constitutivos_format = this.currency.transform(this.source_retention.ingresos_no_constitutivos);
    this.sub_total_1_format = this.currency.transform(this.source_retention.sub_total_1);
    this.deduc1_format = this.currency.transform(this.source_retention.deduc1);
    this.deduc2_format = this.currency.transform(this.source_retention.deduc2);
    this.deduc3_format = this.currency.transform(this.source_retention.deduc3);
    this.total_deduc_format = this.currency.transform(this.source_retention.total_deduc);
    this.sub_total_2_format = this.currency.transform(this.source_retention.sub_total_2);
    this.rent1_format = this.currency.transform(this.source_retention.rent1);
    this.rent2_format = this.currency.transform(this.source_retention.rent2);
    this.rent3_format = this.currency.transform(this.source_retention.rent3);
    this.total_renta_format = this.currency.transform(this.source_retention.total_renta);
    this.sub_total_3_format = this.currency.transform(this.source_retention.sub_total_3);
    this.Renta_de_Trabajo_Exenta_format = this.currency.transform(this.source_retention.Renta_de_Trabajo_Exenta);
    this.sub_total_4_format = this.currency.transform(this.source_retention.sub_total_4);
    this.Cifra_control1_format = this.currency.transform(this.source_retention.Cifra_control1);
    this.Cifra_control2_format = this.currency.transform(this.source_retention.Cifra_control2);
    this.Cifra_control3_format = this.currency.transform(this.source_retention.Cifra_control3);
    this.Ingreso_Base_format = this.currency.transform(this.source_retention.Ingreso_Base);
    this.Ingreso_laboral_gravado_en_UVT_format = this.source_retention.Ingreso_laboral_gravado_en_UVT;
    this.Retencion_por_aplicar_format = this.currency.transform(this.source_retention.Retencion_por_aplicar);
    this.Rete_ica_format = this.currency.transform(this.source_retention.Rete_ica);
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;
    var formData = new FormData();

    if (!this.form.invalid) {
      this.loading = true;
      if (this.procedence == 0) {
        var i = 0;
        this.selectedOptions.forEach(element => {
          var indicator = 'file_' + i;
          if (element.file != '') {
            formData.append(indicator, element.file);
          }
          i++;
        });
        formData.append('account_receivable_id', this.data.id);
        formData.append('source_retention_type_id', JSON.stringify(this.selectedOptions));

        this.SourceRetentionS.Save(formData).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else if (this.procedence == 1) {
        this.AccountReceivableS.Update({
          id: this.data.id,
          file_payment: this.data.file_payment,
          observation: this.data.observation,
          gross_value_activities: this.data.gross_value_activities,
          net_value_activities: this.data.gross_value_activities - (this.source_retention.Retencion_por_aplicar + this.source_retention.Rete_ica),
          user_id: this.data.user_id,
          status_bill_id: 2,
          minimum_salary_id: this.data.minimum_salary_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
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

  RentAccountReceivable() {
    this.dialogFormService.open(FormRejectAccountComponent, {
      context: {
        title: 'Rechazar cuenta de cobro',
        data: this.data,
        saved: this.saved.bind(this),
        closeP: this.close.bind(this),
      },
    });
  }

}
