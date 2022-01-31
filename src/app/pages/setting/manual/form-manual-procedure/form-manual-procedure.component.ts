import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProcedureService} from '../../../../business-controller/procedure.service';
import {ProcedureTypeService} from '../../../../business-controller/procedure-type.service';
import { PriceTypeService } from '../../../../business-controller/price-type.service';
import { ManualPriceService } from '../../../../business-controller/manual-price.service';
import { ProcedurePackageComponent } from '../../procedure/procedure-package/procedure-package.component';
import { ProcedurePackageService } from '../../../../business-controller/procedure-package.Service';



@Component({
  selector: 'ngx-form-manual-procedure',
  templateUrl: './form-manual-procedure.component.html',
  styleUrls: ['./form-manual-procedure.component.scss']
})
export class FormManualProcedureComponent implements OnInit {


  @Input() title: string;
  @Input() data: any = null;
  @Input() manual_id;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public procedure_category: any [];
  public gender: any [];
  public procedure_age: any [];
  public procedure_purpose: any [];
  public purpose_service: any [];
  public procedure_type: any [];
  public pbs_type: any [];
  public status: any [];
  public procedure_cups: any[];
  public showSelect: Boolean = false;
  public price_type: any[] = [];
  public procedure_id;
  public showTable;
  public selectedOptions:any[];



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private  ManualPriceS: ManualPriceService,
    private ProcedureTypeS: ProcedureTypeService,
    private PriceTypeS: PriceTypeService,
    private procedurePackageS: ProcedurePackageService,
    private toastS: NbToastrService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        own_code: '',
        homologous_id: '',
        name: '',
        manual_id:'',
        value:'',
        price_type_id:'',
        procedure_id:'',
        manual_procedure_type_id:'',
      };   
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
    });


    await this.ProcedureTypeS.GetCollection().then(x => {
      this.procedure_type=x;
    });
    await this.ProcedureS.GetCollection().then(x => {
      this.procedure_cups=x;
    });
    this.PriceTypeS.GetCollection().then(x => {
      this.price_type=x;
    });
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  onChange(tipoId) {
    if(tipoId==2){
      this.showSelect=true;
      this.form.controls.homologous_id.disable();
      this.form.controls.own_code.enable();
      this.form.controls.name.enable();
      this.form.controls.own_code.setValue('');
      this.form.controls.name.setValue('');
    }else if (tipoId==3){
      this.showTable=true;
      this.form.controls.own_code.enable();
      this.form.controls.name.enable();
      this.form.controls.own_code.setValue('');
      this.form.controls.name.setValue('');
    }else if(tipoId==1){
      this.showSelect=true;
      this.form.controls.homologous_id.disable();
      this.form.controls.own_code.disable();
      this.form.controls.name.disable();
    }
    
    else{
      this.form.controls.homologous_id.disable();
      this.showSelect=false;
    }
}

public saveCode(e): void {
  var filter = this.procedure_cups.filter(procedure => procedure.code==e.target.value);
 this.procedure_id= filter[0].id;
  this.form.controls.homologous_id.setValue(e.target.value);
if(this.form.controls.manual_procedure_type_id.value==1){
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
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id=x.data.manual_price.id;
          var contador=0;
          var err=0;
          if (this.saved) {
            this.saved();
          }
          if (!this.selectedOptions.length) {
            this.toastS.danger(null, 'Debe seleccionar al menos un Procedimiento');
          }
          else{
            var dta = {
              procedure_package_id:null,
              procedure_id: null,
          };
            this.selectedOptions.forEach(element => {
            dta.procedure_package_id=id;
            dta.procedure_id = element.id;
            this.procedurePackageS.Save(dta).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;
          });
          if(contador > 0){
            this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos'); 
          }else if(err > 0){
            this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
          }
          this.selectedOptions=[];
        } 
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
