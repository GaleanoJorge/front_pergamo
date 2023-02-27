import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyLotService } from '../../../business-controller/pharmacy-lot.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-pharmacy-lot',
  templateUrl: './pharmacy-lot.component.html',
  styleUrls: ['./pharmacy-lot.component.scss']
})
export class PharmacyLotComponent implements OnInit {
 
  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Output() messageEvent = new EventEmitter<any>();
// 
  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public billing_stock_id: any[];
  public selectedOptions: any[] = [];
  public user;
  public show: boolean = false;
  public pharmacy_stock_id;
  // public TotOperation;
  public today = null;

  constructor(
    private formBuilder: FormBuilder,
    private pharmalotS: PharmacyLotService,
    private pharmalotStockS: PharmacyLotStockService,
    private toastService: NbToastrService,
    private toastS: NbToastrService,
    private authService: AuthService,
    private currency: CurrencyPipe,
  ) {
  }

  async ngOnInit() {
    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];
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
        num_invoice: '',
        date_invoice: '',
      };
    }

    this.form = this.formBuilder.group({
      num_invoice: [this.data.num_invoice, Validators.compose([Validators.required])],
      date_invoice: [this.data.date_invoice, Validators.compose([Validators.required])],
      subtotal: [this.data.subtotal, Validators.compose([Validators.required])],
      vat: [this.data.vat],
      total: [this.data.total, Validators.compose([Validators.required])],
      receipt_date: [this.data.receipt_date, Validators.compose([Validators.required])],
    });
    this.form.controls.total.disable();
    this.form.controls.vat.disable();
    this.form.controls.subtotal.disable();

  }
  receiveMessage($event) {
    this.selectedOptions = $event.selected ? $event.selected : $event;
    // this.pharmacy_stock_id = $event.pharmacy_id;
    if (this.selectedOptions.length > 0 && !$event.selected) {
      var asd = 0;
      var zon = 0;
      var holi = 19;
      this.selectedOptions.forEach(element => {
        asd += element.amount_total * element.amount_unit
        if (element.iva != 0 && element.amount_total != 0) {
          zon = (asd * holi) / 100;
        } else {
          zon = 0
        }
      });
    }
    this.form.patchValue({ subtotal: asd });
    this.form.patchValue({ vat: zon });
    var tot2 = zon + asd;
    this.form.patchValue({ total: tot2 });
  }

  receiveMessage1($event) {
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
            date_invoice: this.form.controls.date_invoice.value,
            num_invoice: this.form.controls.num_invoice.value,
            subtotal: this.form.controls.subtotal.value,
            vat: this.form.controls.vat.value,
            total: this.form.controls.total.value,
            receipt_date: this.form.controls.receipt_date.value,
            pharmacy_stock_id: this.pharmacy_stock_id,
          }).then(x => {
            this.messageEvent.emit(true);
            this.toastService.success('', x.message);
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
              this.messageEvent.emit(true);
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
            date_invoice: this.form.controls.date_invoice.value,
            num_invoice: this.form.controls.num_invoice.value,
            subtotal: this.form.controls.subtotal.value,
            vat: this.form.controls.vat.value,
            total: this.form.controls.total.value,
            receipt_date: this.form.controls.receipt_date.value,
            pharmacy_stock_id: 1,
          }).then(x => {
            this.messageEvent.emit(true);
            this.toastService.success('', x.message);
            var id = x.data.pharmacy_lot.id;
            var contador = 0;
            var err = 0;
            this.form.setValue({ date_invoice: '', num_invoice: '', subtotal: '', vat: '', total: '', receipt_date: '' });
            this.pharmalotStockS.Save({
              pharmacy_lot_id: id,
              billing_stock_id: JSON.stringify(this.selectedOptions),
              pharmacy_stock_id: 1,
            }).then(x => {
              this.messageEvent.emit(true);
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
    } else {
      this.toastService.danger('DEBE LLENAR TODOS LOS DATOS');
    }
  }

  onDatechange($event) {
    var date = new Date($event.target.value);
    var now_date = new Date;

    if (date > now_date) {
      this.form.controls.receipt_date.setErrors({ 'incorrect': true });
      this.toastS.danger(null, 'La fecha no puede ser mayor a la actual');
    } else {
      this.form.controls.receipt_date.setErrors(null);
    }
  }





  onDatechange1($event) {
    var date = new Date($event.target.value);
    var now_date = new Date;

    if (date > now_date) {
      this.form.controls.date_invoice.setErrors({ 'incorrect': true });
      this.toastS.danger(null, 'La fecha no puede ser mayor a la actual');
    } else {
      this.form.controls.date_invoice.setErrors(null);
    }
  }
}
