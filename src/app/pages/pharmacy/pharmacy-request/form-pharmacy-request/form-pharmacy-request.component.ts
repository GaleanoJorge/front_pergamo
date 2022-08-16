import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-pharmacy-request',
  templateUrl: './form-pharmacy-request.component.html',
  styleUrls: ['./form-pharmacy-request.component.scss']
})
export class FormPharmacyRequestComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() my_pharmacy_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public pharmacy_lot_stock_id: any[];
  public selectedOptions: any[] = [];
  public user;
  public show_table;
  public all_changes: any[];
  public own_pharmacy_stock_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private pharProdReqS: PharmacyProductRequestService,
    private toastService: NbToastrService,
    private authService: AuthService,
    private toastS: NbToastrService,
    public userChangeS: UserChangeService,
    private perPharmaS: PharmacyStockService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    if (this.data.product_generic_id == null) {
      this.parentData = {
        selectedOptions: [],
        entity: 'pharmacy_lot_stock?product_supplies_id=' + this.data.product_supplies_id + '&pharmacy_stock_id=' + this.data.request_pharmacy_stock_id,
        customData: 'pharmacy_lot_stock',
      };
    } else {
      this.parentData = {
        selectedOptions: [],
        entity: 'pharmacy_lot_stock?product_generic_id=' + this.data.product_generic_id + '&pharmacy_stock_id=' + this.data.request_pharmacy_stock_id,
        customData: 'pharmacy_lot_stock',
      };
    }
    this.show_table = true;
    if (!this.data) {
      this.data = {
        request_amount: '',
      };
    }

    this.form = this.formBuilder.group({
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
    });
    await this.perPharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.own_pharmacy_stock_id = x;
    });
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      var valid_values = true;
      var total_sent = 0;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0 || element.amount_damaged >= 0) {
            valid_values = false;
          } else {
            total_sent += element.amount
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;

        if (this.data.id) {
          this.pharProdReqS.updateInventoryByLot({
            id: this.data.id,
            amount: total_sent,
            status: 'ENVIADO',
            own_pharmacy_stock_id: this.my_pharmacy_id,
            request_pharmacy_stock_id: this.data.request_pharmacy_stock_id,
            pharmacy_lot_stock_id: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.pharmacy_product_request.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
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
          this.pharProdReqS.Save({
            amount: this.form.controls.amount.value,
            status: 'ENVIADO',
            own_pharmacy_stock_id: this.my_pharmacy_id,
            request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.pharmacy_product_request.id;
            var contador = 0;
            var err = 0;
            this.pharProdReqS.Save({
              pharmacy_product_request_id: id,
              pharmacy_lot_stock_id: JSON.stringify(this.selectedOptions),
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
