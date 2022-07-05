import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-pharmacy-income',
  templateUrl: './form-pharmacy-income.component.html',
  styleUrls: ['./form-pharmacy-income.component.scss']
})
export class FormPharmacyIncomeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public pharmacy_lot_stock_id: any[];
  public selectedOptions: any[] = [];
  public user;
  public show: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private pharmalotStockS: PharmacyLotStockService,
    private pharProdReqS: PharmacyProductRequestService,
    private toastService: NbToastrService,
    private toastS: NbToastrService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'pharmacy_request_shipping?pharmacy_product_request_id=' + this.data.id + '& product1=' + true,
      customData: 'pharmacy_request_shipping',
    };
    if (!this.data) {
      this.data = {
        amount_damaged: '',
        amount: '',
        observation: '',
      };
    }
    this.form = this.formBuilder.group({
      cantidad_enviada: [this.data.cantidad_enviada],
      observation: [this.data.observation],
    });
  }

  close() {
    this.dialogRef.close();
  }
  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0) {
            valid_values = false;
          }
          if (element.amount_damaged == null || element.amount_damaged < 0) {
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
          this.pharProdReqS.updateInventoryByLot({
            id: this.data.id,
            observation: this.form.controls.observation.value,
            status: 'ACEPTADO',
            own_pharmacy_stock_id: this.data.own_pharmacy_stock_id,
            pharmacy_lot_stock_id: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
            this.toastS.danger(x, 'Error');
          });
        } else {
          this.pharProdReqS.Save({
            observation: this.form.controls.observation.value,
            status: 'ACEPTADO',
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.pharmacy_lot_stock.id;
            var contador = 0;
            var err = 0;
            this.pharmalotStockS.Save({
              pharmacy_product_request_id: id,
              pharmacy_request_shipping_id: JSON.stringify(this.selectedOptions),
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
