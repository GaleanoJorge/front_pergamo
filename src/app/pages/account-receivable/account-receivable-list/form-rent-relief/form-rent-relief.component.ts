import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../../../business-controller/bank.service';
import { AccountTypeService } from '../../../../business-controller/account-type.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';
import { SourceRetentionService } from '../../../../business-controller/source-retention.service';
import { environment } from '../../../../../environments/environment.prod';
import { TaxValueUnitService } from '../../../../business-controller/tax-value-unit.service';
import { CurrencyPipe } from '@angular/common';


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

  public tax_value_unit = 0;

  public salud = 0;
  public arl = 0;
  public pension = 0;
  public ingresos_no_constitutivos = 0;
  public sub_total_1 = 0;
  public deduc1 = 0;
  public deduc2 = 0;
  public deduc3 = 0;
  public total_deduc = 0;
  public sub_total_2 = 0;
  public rent1 = 0;
  public rent2 = 0;
  public rent3 = 0;
  public total_renta = 0;
  public sub_total_3 = 0;
  public Renta_de_Trabajo_Exenta = 0;
  public sub_total_4 = 0;
  public Cifra_control1 = 0;
  public Cifra_control2 = 0;
  public Cifra_control3 = 0;
  public Ingreso_Base = 0;
  public Ingreso_laboral_gravado_en_UVT = 0;
  public Retencion_por_aplicar = 0;

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
      this.TaxValueUnitS.GetLatestTaxValueUnit().then(x => {
        this.tax_value_unit = x['value'];
        this.applySourceRetention();
      });
    }

    this.form = this.formBuilder.group({

    });
  }



  receiveMessage($event) {
    this.selectedOptions = $event;
    if (this.procedence == 1) {
      this.applySourceRetention();
    }
  }

  applySourceRetention() {
    if (this.data.gross_value_activities >= this.data.minimum_salary.value) {
      this.salud = this.data.gross_value_activities * 0.04;
      this.arl = this.data.gross_value_activities * 0.01;
      this.pension = this.data.gross_value_activities * 0.04;
    }
    this.ingresos_no_constitutivos = this.salud + this.arl + this.pension;
    this.sub_total_1 = Math.round((this.data.gross_value_activities - this.salud - this.arl - this.pension) / 1000) * 1000;
    this.selectedOptions.forEach(element => {
      var limit = Math.round((element.source_retention_type.tax_value_unit.value * (element.source_retention_type.value == -1 ? Infinity : element.source_retention_type.value)) / 1000) * 1000;
      if (element.source_retention_type_id == 1) {
        if (element.value <= limit) {
          this.deduc1 = element.value;
        } else {
          this.deduc1 = limit;
        }
      } else if (element.source_retention_type_id == 2) {
        if (element.value <= limit) {
          this.deduc2 = element.value;
        } else {
          this.deduc2 = limit;
        }
      } else if (element.source_retention_type_id == 3) {
        if (element.value <= limit) {
          this.deduc3 = element.value;
        } else {
          this.deduc3 = limit;
        }
      } else if (element.source_retention_type_id == 4) {
        if (element.value <= limit) {
          this.rent1 = element.value;
        } else {
          this.rent1 = limit;
        }
      } else if (element.source_retention_type_id == 5) {
        if (element.value <= limit) {
          this.rent2 = element.value;
        } else {
          this.rent2 = limit;
        }
      } else if (element.source_retention_type_id == 6) {
        if (element.value <= limit) {
          this.rent3 = element.value;
        } else {
          this.rent3 = limit;
        }
      }
    });
    this.total_deduc = this.deduc1 + this.deduc2 + this.deduc3;
    this.sub_total_2 = this.sub_total_1 - this.total_deduc;
    this.total_renta = this.rent1 + this.rent2 + this.rent3;
    this.sub_total_3 = this.sub_total_2 - this.total_renta;
    var max_renta_excenta = Math.round((this.tax_value_unit * 240) / 1000) * 1000;
    var renta_provicional = Math.round((this.sub_total_3 * 0.25) / 1000) * 1000;
    this.Renta_de_Trabajo_Exenta = renta_provicional >= max_renta_excenta ? max_renta_excenta : renta_provicional;
    this.sub_total_4 = this.sub_total_3 - this.Renta_de_Trabajo_Exenta;
    this.Cifra_control1 = Math.round((this.sub_total_1 * 0.4) / 1000) * 1000;
    this.Cifra_control2 = this.Renta_de_Trabajo_Exenta + this.total_renta + this.total_deduc;
    this.Cifra_control3 = Math.round((this.tax_value_unit * 420) / 1000) * 1000;
    var array_cifras = [this.Cifra_control1, this.Cifra_control2, this.Cifra_control3];
    var cifras_value_asc = array_cifras.sort(function (a, b) { return a - b });
    this.Ingreso_Base = this.sub_total_1 - cifras_value_asc[0];
    this.Ingreso_laboral_gravado_en_UVT = Math.round((this.Ingreso_Base / this.tax_value_unit) * 100) / 100;
    var sub_response = 0;
    if (this.Ingreso_laboral_gravado_en_UVT <= 95) {
      sub_response = 0;
    } else if (this.Ingreso_laboral_gravado_en_UVT > 95 && this.Ingreso_laboral_gravado_en_UVT <= 150) {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 95) * 0.19 * this.tax_value_unit;
    } else if (this.Ingreso_laboral_gravado_en_UVT > 150 && this.Ingreso_laboral_gravado_en_UVT <= 360) {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 150) * 0.28 * this.tax_value_unit;
    } else if (this.Ingreso_laboral_gravado_en_UVT > 360 && this.Ingreso_laboral_gravado_en_UVT <= 640) {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 360) * 0.33 * this.tax_value_unit;
    } else if (this.Ingreso_laboral_gravado_en_UVT > 640 && this.Ingreso_laboral_gravado_en_UVT <= 945) {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 640) * 0.35 * this.tax_value_unit;
    } else if (this.Ingreso_laboral_gravado_en_UVT > 945 && this.Ingreso_laboral_gravado_en_UVT <= 2300) {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 945) * 0.37 * this.tax_value_unit;
    } else {
      sub_response = (this.Ingreso_laboral_gravado_en_UVT - 2300) * 0.39 * this.tax_value_unit;
    }
    this.Retencion_por_aplicar = Math.round((sub_response) / 1000) * 1000;

    this.gross_value_activities_format = this.currency.transform(this.data.gross_value_activities);
    this.salud_format = this.currency.transform(this.salud);
    this.arl_format = this.currency.transform(this.arl);
    this.pension_format = this.currency.transform(this.pension);
    this.ingresos_no_constitutivos_format = this.currency.transform(this.ingresos_no_constitutivos);
    this.sub_total_1_format = this.currency.transform(this.sub_total_1);
    this.deduc1_format = this.currency.transform(this.deduc1);
    this.deduc2_format = this.currency.transform(this.deduc2);
    this.deduc3_format = this.currency.transform(this.deduc3);
    this.total_deduc_format = this.currency.transform(this.total_deduc);
    this.sub_total_2_format = this.currency.transform(this.sub_total_2);
    this.rent1_format = this.currency.transform(this.rent1);
    this.rent2_format = this.currency.transform(this.rent2);
    this.rent3_format = this.currency.transform(this.rent3);
    this.total_renta_format = this.currency.transform(this.total_renta);
    this.sub_total_3_format = this.currency.transform(this.sub_total_3);
    this.Renta_de_Trabajo_Exenta_format = this.currency.transform(this.Renta_de_Trabajo_Exenta);
    this.sub_total_4_format = this.currency.transform(this.sub_total_4);
    this.Cifra_control1_format = this.currency.transform(this.Cifra_control1);
    this.Cifra_control2_format = this.currency.transform(this.Cifra_control2);
    this.Cifra_control3_format = this.currency.transform(this.Cifra_control3);
    this.Ingreso_Base_format = this.currency.transform(this.Ingreso_Base);
    this.Ingreso_laboral_gravado_en_UVT_format = this.Ingreso_laboral_gravado_en_UVT;
    this.Retencion_por_aplicar_format = this.currency.transform(this.Retencion_por_aplicar);
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
          gross_value_activities: this.data.gross_value_activities,
          net_value_activities: this.data.gross_value_activities - this.Retencion_por_aplicar,
          user_id: this.data.user_id,
          status_bill_id: this.data.status_bill_id,
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

}
