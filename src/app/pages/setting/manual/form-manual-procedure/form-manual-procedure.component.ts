import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { ProcedureTypeService } from '../../../../business-controller/procedure-type.service';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { ProcedurePackageComponent } from '../../procedure/procedure-package/procedure-package.component';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.service';



@Component({
  selector: 'ngx-form-manual-procedure',
  templateUrl: './form-manual-procedure.component.html',
  styleUrls: ['./form-manual-procedure.component.scss']
})
export class FormManualProcedureComponent implements OnInit {


  @Input() title: string;
  @Input() data: any = null;
  @Input() show: any = null;
  @Input() manual_id;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public procedure_category: any[];
  public gender: any[];
  public procedure_age: any[];
  public procedure_purpose: any[];
  public purpose_service: any[];
  public procedure_type: any[];
  public pbs_type: any[];
  public status: any[];
  public procedure_cups: any[];
  public manual_procedure_type: any[] = null;
  public manual_insume_type: any[] = null;
  public manual_product_type: any[] = null;
  public showSelect: Boolean = false;
  public price_type: any[] = [];
  public procedure_id;
  public showTable;
  public selectedOptions: any[] = [];
  public selectedOptionsI: any[] = [];
  public selectedOptionsP: any[] = [];
  public parentData;
  public parentDataInsume;
  public parentDataProduct;
  public showtab;



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private ManualPriceS: ManualPriceService,
    private ProcedureTypeS: ProcedureTypeService,
    private PriceTypeS: PriceTypeService,
    private procedurePackageS: ProcedurePackageService,
    private toastS: NbToastrService,
  ) {
  }

  async ngOnInit() {
    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };
    this.parentDataInsume = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };
    this.parentDataProduct = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };
    if (!this.data) {
      this.data = {
        own_code: '',
        homologous_id: '',
        name: '',
        manual_id: '',
        value: '',
        price_type_id: '',
        procedure_id: '',
        manual_procedure_type_id: '',
        description: ''
      };
      this.parentData.entity = 'procedure_bypackage?procedure=true';
      this.parentData.customData = 'procedure_package';

      this.parentDataInsume.entity = 'procedure_bypackage?insume=true';
      this.parentDataInsume.customData = 'procedure_package';

      this.parentDataProduct.entity = 'procedure_bypackage?product=true';
      this.parentDataProduct.customData = 'procedure_package';
    } else {
      this.parentData.entity = 'procedure_bypackage?procedure=true';
      this.parentData.customData = 'procedure_package';

      this.parentDataInsume.entity = 'procedure_bypackage?insume=true';
      this.parentDataInsume.customData = 'procedure_package';

      this.parentDataProduct.entity = 'procedure_bypackage?product=true';
      this.parentDataProduct.customData = 'procedure_package';
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });


    this.form = this.formBuilder.group({
      own_code: [this.data.own_code, Validators.compose([Validators.required])],
      homologous_id: [this.data.homologous_id, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      manual_id: [this.data.manual_id],
      value: [this.data.value, Validators.compose([Validators.required])],
      price_type_id: [this.data.price_type_id, Validators.compose([Validators.required])],
      procedure_id: [this.data.procedure_id],
      manual_procedure_type_id: [this.data.manual_procedure_type_id, Validators.compose([Validators.required])],
      description: [this.data.description],
    });


    await this.ProcedureTypeS.GetCollection().then(x => {
      this.procedure_type = x;
    });
    await this.ProcedureS.GetCollection().then(x => {
      this.procedure_cups = x;
    });
    await this.procedurePackageS.GetCollection({ procedure_package_id: this.data.id }).then(x => {
      if (x.length > 0 || this.data.manual_procedure_type_id == 3) {
        this.manual_procedure_type = [];
        this.manual_insume_type = []
        this.manual_product_type = []
        x.forEach(element => {
          if (element.procedure_id) {
            this.manual_procedure_type.push(element);
          } else if (element.product_id) {
            this.manual_product_type.push(element);
          } else if (element.supplies_id) {
            this.manual_insume_type.push(element);
          }
        });
        this.parentData.selectedOptions = this.manual_procedure_type;
        this.parentDataProduct.selectedOptions = this.manual_product_type;
        this.parentDataInsume.selectedOptions = this.manual_insume_type;
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    });
    this.PriceTypeS.GetCollection().then(x => {
      this.price_type = x;
    });
  }

  receiveMessage($event, e) {

    if (e == 1) {
      this.selectedOptions = $event;
    } else if (e == 2) {
      this.selectedOptionsP = $event
    } else if (e == 3) {
      this.selectedOptionsI = $event
    }
  }

  tablock(e) {
    console.log(e.tabTitle);
    switch (e.tabTitle) {
      case "PROCEDIMIENTOS": {
        this.showtab = 1;
        break;
      }
      case "MEDICAMENTOS": {
        this.showtab = 2;
        break;
      }
      case "INSUMOS": {
        this.showtab = 3;
        break;
      }
    }
  }

  onChange(tipoId) {
    if (tipoId == 2) {
      this.showSelect = true;
      this.showTable = false;
      this.selectedOptions = [];
      this.selectedOptions = [];
      this.selectedOptions = [];
      this.form.controls.homologous_id.disable();
      this.form.controls.own_code.enable();
      this.form.controls.name.enable();
      this.form.controls.own_code.setValue('');
      this.form.controls.name.setValue('');
    } else if (tipoId == 3) {
      this.showTable = true;
      this.showSelect = false;
      this.form.controls.own_code.enable();
      this.form.controls.name.enable();
      this.form.controls.own_code.setValue('');
      this.form.controls.name.setValue('');
    } else if (tipoId == 1) {
      this.showSelect = true;
      this.showTable = false;
      this.selectedOptions = [];
      this.selectedOptions = [];
      this.selectedOptions = [];
      this.form.controls.homologous_id.disable();
      this.form.controls.own_code.disable();
      this.form.controls.name.disable();
    }

    else {
      this.form.controls.homologous_id.disable();
      this.showSelect = false;
      this.show = false
    }
  }

  public saveCode(e): void {
    var filter = this.procedure_cups.filter(procedure => procedure.code == e.target.value);
    this.procedure_id = filter[0].id;
    this.form.controls.homologous_id.setValue(e.target.value);
    if (this.form.controls.manual_procedure_type_id.value == 1) {
      this.form.controls.homologous_id.setValue(filter[0].code);
      this.form.controls.own_code.setValue(filter[0].code);
      this.form.controls.name.setValue(filter[0].name);
    }
  }

  cups() {
    this.form.controls.homologous_id.setValue(this.form.controls.homologous_id.value);
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.form.controls.manual_procedure_type_id.value == 3) {
        if (!this.selectedOptions.length && !this.selectedOptionsP.length && !this.selectedOptionsI.length) {
          this.toastS.danger('', 'Debe seleccionar al menos un Procedimiento producto o insumo');
          this.isSubmitted = false;
          this.loading = false;
        } else {
          if (this.data.id) {
            this.ManualPriceS.Update({
              id: this.data.id,
              own_code: this.form.controls.own_code.value,
              homologous_id: this.form.controls.homologous_id.value,
              name: this.form.controls.name.value,
              manual_id: this.manual_id,
              value: this.form.controls.value.value,
              price_type_id: this.form.controls.price_type_id.value,
              procedure_id: this.procedure_id,
              manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
              description: this.form.controls.description.value,
            }).then(x => {
              this.toastService.success('', x.message);
              this.close();
              var err = 0;
              if (this.saved) {
                this.saved();
              }
              if (!this.selectedOptions.length && !this.selectedOptionsP.length && !this.selectedOptionsI.length) {
                this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento');
              }
              else {
                this.procedurePackageS.Update({
                  id: this.data.id,
                  procedure_id: this.selectedOptions ? JSON.stringify(this.selectedOptions) : null,
                  supplies_id: this.selectedOptionsI ? JSON.stringify(this.selectedOptionsI) : null,
                  product_id: this.selectedOptionsP ? JSON.stringify(this.selectedOptionsP) : null,
                }).then(x => {
                }).catch(x => {
                  err++;
                });
              }
            }).catch(x => {
              this.isSubmitted = false;
              this.loading = false;
            });
          } else {
            this.ManualPriceS.Save({
              own_code: this.form.controls.own_code.value,
              homologous_id: this.form.controls.homologous_id.value,
              name: this.form.controls.name.value,
              manual_id: this.manual_id,
              value: this.form.controls.value.value,
              price_type_id: this.form.controls.price_type_id.value,
              procedure_id: this.procedure_id,
              manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
              description: this.form.controls.description.value,
              procedures_id: this.selectedOptions ? JSON.stringify(this.selectedOptions) : null,
              supplies_id: this.selectedOptionsI ? JSON.stringify(this.selectedOptionsI) : null,
              product_id: this.selectedOptionsP ? JSON.stringify(this.selectedOptionsP) : null,
            }).then(async x => {
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
      } else {
        if (this.data.id) {
          this.ManualPriceS.Update({
            id: this.data.id,
            own_code: this.form.controls.own_code.value,
            homologous_id: this.form.controls.homologous_id.value,
            name: this.form.controls.name.value,
            manual_id: this.manual_id,
            value: this.form.controls.value.value,
            price_type_id: this.form.controls.price_type_id.value,
            procedure_id: this.procedure_id,
            manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
            description: this.form.controls.description.value,
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
        } else {
          this.ManualPriceS.Save({
            own_code: this.form.controls.own_code.value,
            homologous_id: this.form.controls.homologous_id.value,
            name: this.form.controls.name.value,
            manual_id: this.manual_id,
            value: this.form.controls.value.value,
            price_type_id: this.form.controls.price_type_id.value,
            procedure_id: this.procedure_id,
            manual_procedure_type_id: this.form.controls.manual_procedure_type_id.value,
            description: this.form.controls.description.value,
          }).then(async x => {
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

}
