import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { BillingStockService } from '../../../../business-controller/billing-stock.service';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyLotService } from '../../../../business-controller/pharmacy-lot.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'ngx-form-pharmacy-lot',
  templateUrl: './form-pharmacy-lot.component.html',
  styleUrls: ['./form-pharmacy-lot.component.scss']
})
export class FormPharmacyLotComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public billing_stock_id: any[];
  public selectedOptions: any[] = [];
  public user;
  public show: boolean = false;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private pharmalotS: PharmacyLotService,
    private pharmalotStockS: PharmacyLotStockService,
    
    private toastService: NbToastrService,
    private toastS: NbToastrService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };
    if (!this.data) {
      this.data = {
        subtotal: '',
        vat: '',
        total: '',
        receipt_date: '',
      };
    }

    this.form = this.formBuilder.group({
      subtotal: [this.data.subtotal, Validators.compose([Validators.required])],
      vat: [this.data.vat, Validators.compose([Validators.required])],
      total: [this.data.total, Validators.compose([Validators.required])],
      receipt_date: [this.data.receipt_date, Validators.compose([Validators.required])],
    });
  }
  close() {
    this.dialogRef.close();
  }
  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount_total == null || element.amount_total <= 0) {
            valid_values = false;
          }
          if (element.lot == null || element.lot <= 0) {
            valid_values = false;
          }
          if (element.expiration_date == null || element.expiration_date <= 0) {
            valid_values = false;
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;

        if (this.data.id) {
          this.pharmalotS.Update({
            id: this.data.id,
            subtotal: this.form.controls.subtotal.value,
            vat: this.form.controls.vat.value,
            total: this.form.controls.total.value,
            receipt_date: this.form.controls.receipt_date.value,
            pharmacy_stock_id: 1,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.pharmacy_lot.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            this.pharmalotStockS.Update({
              pharmacy_lot_id: id,
              billing_stock_id: JSON.stringify(this.selectedOptions),
            }, id).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;

            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          this.pharmalotS.Save({
            subtotal: this.form.controls.subtotal.value,
            vat: this.form.controls.vat.value,
            total: this.form.controls.total.value,
            receipt_date: this.form.controls.receipt_date.value,
            pharmacy_stock_id: 1,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.pharmacy_lot.id;
            var contador = 0;
            var err = 0;
            this.pharmalotStockS.Save({
              pharmacy_lot_id: id,
              billing_stock_id: JSON.stringify(this.selectedOptions),
            }).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;
            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
            }
            this.selectedOptions = [];
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
}
