import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-pharmacy-return',
  templateUrl: './form-pharmacy-return.component.html',
  styleUrls: ['./form-pharmacy-return.component.scss']
})
export class FormPharmacyReturnComponent implements OnInit {

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
  public selectedOptions: any[] = [];
  public user;
  public show_table;
  public request_pharmacy_stock_id: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private pharProdReqS: PharmacyProductRequestService,
    private toastService: NbToastrService,
    private authService: AuthService,
    private toastS: NbToastrService,
    public userChangeS: UserChangeService,
    private pharmaS: PharmacyStockService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'pharmacy_product_request',
      //   entity: 'pharmacy_product_request?product_generic_id=' + this.data.product_generic_id + '&pharmacy_stock_id=' + this.data.request_pharmacy_stock_id,
      customData: 'pharmacy_product_request',
    };
    this.show_table = true;
    if (!this.data) {
      this.data = {
        //   request_amount: '',
      };
    }

    this.form = this.formBuilder.group({
      //  request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
    });
    await this.pharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.request_pharmacy_stock_id = x;
    });

    return Promise.resolve(true);
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
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      } else {
        this.pharProdReqS.updateInventoryByLot({
          //id: this.data.id,
          status: 'ACEPTAR',
          own_pharmacy_stock_id: 2,
          request_pharmacy_stock_id: this.my_pharmacy_id,
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

        });
      }
    }
  }

}
