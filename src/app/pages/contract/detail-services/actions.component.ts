import {Component, Input,TemplateRef} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicesBriefcaseService} from '../../../business-controller/services-briefcase.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Editar" *ngIf="value.role_permisos.includes(2)" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton  ghost (click)="ConfirmAction(confirmAction)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbTooltip="Eliminar" *ngIf="value.role_permisos.includes(4)" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a *ngIf="value.data.manual_price.manual_procedure_type_id==3 && value.role_permisos.includes(1)"  nbTooltip="Información del paquete" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/setting/manual/procedure-massive/procedure-package/' + value.data.manual_price.id">
        <nb-icon icon="info-outline"></nb-icon>
      </a>
      <button *ngIf="value.data.manual_price.description" nbButton ghost [nbPopover]="templateRef"  nbPopoverTrigger="hover">
      <nb-icon icon="eye-outline"></nb-icon>
    </button>
    </div>


<ng-template #templateRef>
<div class="p-3 container-fluid">
  <nb-card style="max-width: 430px;max-height: 500px;overflow: auto;">
  <nb-card-header>Descripción</nb-card-header>
    <nb-card-body>
      <p>
        {{value.data.manual_price.description}}     
      </p>
    </nb-card-body>
  </nb-card>
</div>
</ng-template>
    <ng-template #confirmAction>
  <div class="container-fluid">
      <nb-card>
          <nb-card-header>Catalogo de servicios</nb-card-header>
          <nb-card-body>
                      <form  [formGroup]="InscriptionForm" (ngSubmit)="update()">
                        <div class="row">
                          <div class="col-md-12">
                            <label for="factor" class="form-text text-muted font-weight-bold">Signo:</label>
                            <nb-select formControlName="factor_sign" id="factor_sign" fullWidth
                              status="{{ isSubmitted && form.controls.factor_sign.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
                              <nb-option value="">Seleccione...</nb-option>
                              <nb-option [value]="0">+</nb-option>
                              <nb-option [value]="1">-</nb-option>
                            </nb-select>
                          </div>
                          <div class="col-md-12">
                            <label for="factor" class="form-text text-muted font-weight-bold">Factor en porcentaje:</label>
                            <input nbInput fullWidth id="factor" formControlName="factor" factor
                              status="{{ isSubmitted && form.controls.factor.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}" />
                          </div>
                        </div>
                              <div class="div-send">
                                  <button type="submit" nbButton status="success">Agregar</button>
                              </div>
                      </form>
          </nb-card-body>
      </nb-card>
  </div>
</ng-template>
  `,
})
export class Actions4Component implements ViewCell {

  public messageError = null;
  public InscriptionForm: FormGroup;
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public dialog; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.InscriptionForm = this.formBuilder.group({
      factor_sign: ['', Validators.compose([Validators.required])],
      factor: ['', Validators.compose([Validators.required])],

  });

  console.log(this.value);

  }
  update(){
    var contador=0;
      var err=0;
     if(!this.InscriptionForm.controls.factor.value){
        this.toastS.danger(null, 'Debe seleccionar un Factor');
      }
      else{
        this.dialog = this.dialog.close();
        var dta = {
          id:null,
          sign:null,
          factor: null,
          briefcase_id:null,
          manual_price_id:null,
          price_type_id:null,
          value:null
      }; 
        dta.id=this.value.data.id;
        dta.sign=this.InscriptionForm.controls.factor_sign.value;
        dta.factor = this.InscriptionForm.controls.factor.value;
        dta.briefcase_id = this.value.data.briefcase_id;
        dta.manual_price_id = this.value.data.manual_price_id;
        dta.price_type_id=this.value.data.manual_price.price_type_id;
        dta.value=this.value.data.manual_price.value;
        this.serviceBriefcaseS.Update(dta).then(x => {
        }).catch(x => {
          err++;
        });
        contador++;
      if(contador > 0){
        this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos'); 
      }else if(err > 0){
        this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
      }
    } 
    this.value.refreshData();
    
}

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
}
