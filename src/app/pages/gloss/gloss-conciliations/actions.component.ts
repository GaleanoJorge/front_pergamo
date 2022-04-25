import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { ConciliationResponseService } from '../../../business-controller/conciliation-response.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  <a nbTooltip="Ver respuesta" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="read"
      nbButton ghost
      (click)="ConfirmAction(detailAction,2)">
      <nb-icon icon="eye-outline"></nb-icon>
  </a>
  <a nbTooltip="Conciliar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="read"
      *ngIf="value.data.gloss_status_id!=5 && value.data.gloss_status_id !=8" nbButton ghost (click)="ConfirmAction(confirmAction,1)">
      <nb-icon icon="checkmark-square-outline"></nb-icon>
  </a>
  <a nbTooltip="Sostener glosa" *ngIf="value.data.gloss_status_id == 6 "
      nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="read" nbButton ghost
      (click)="ConfirmAction(stateCartera)">
      <nb-icon icon="flip-2-outline"></nb-icon>
  </a>
</div>
<ng-template #confirmAction>
  <div class="container-fluid">
      <nb-card style="width: 430px;" [nbSpinner]="loading">
          <nb-card-header>Conciliación Glosa</nb-card-header>
          <nb-card-body>
              <form [formGroup]="ResponseConciliationsForm" (ngSubmit)="saveGroup()">
                  <div>
                      <div class="col-md-12">
                          <label for="justification_status" class="form-text text-muted font-weight-bold">Motivo de la
                              glosa:</label>
                          <nb-select fullWidth placeholder="Seleccione..." formControlName="justification_status">
                              <nb-option value="">Seleccione...</nb-option>
                              <nb-option value="0">JUSTIFICADA </nb-option>
                              <nb-option value="1">INJUSTIFICADA </nb-option>
                          </nb-select>
                      </div>
                      <div class="col-md-12">
                          <label for="response" class="form-text text-muted font-weight-bold">Respuesta:</label>
                          <input oninput="this.value = this.value.toUpperCase()" minlength="10" nbInput fullWidth
                              id="response" formControlName="response" response
                              status="{{ isSubmitted && ResponseConciliationsForm.controls.response.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                      </div>
                      <div class="col-md-12">
                          <label for="accepted_value" class="form-text text-muted font-weight-bold">Valor
                              aceptado:</label>
                          <input oninput="this.value = this.value.slice(0,15)" type="number" nbInput fullWidth
                              id="accepted_value" formControlName="accepted_value" accepted_value
                              status="{{ isSubmitted && ResponseConciliationsForm.controls.accepted_value.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                      </div>
                      <div class="col-md-12">
                          <label for="value_not_accepted" class="form-text text-muted font-weight-bold">Valor No
                              aceptado:</label>
                          <input oninput="this.value = this.value.slice(0,15)" type="number" nbInput fullWidth
                              id="value_not_accepted" formControlName="value_not_accepted" value_not_accepted
                              status="{{ isSubmitted && ResponseConciliationsForm.controls.value_not_accepted.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                      </div>
                      <div class="col-md-12">
                          <label for="objetion_code_response"
                              class="form-text text-muted font-weight-bold">Descripción Respuesta:</label>
                          <nb-select fullWidth placeholder="Seleccione..."
                              formControlName="objetion_code_response_id">
                              <nb-option value="">Seleccione...</nb-option>
                              <nb-option *ngFor="let item of objetion_code_response" [value]="item.id">{{ item.code }}
                                  - {{ item.name }}
                              </nb-option>
                          </nb-select>
                      </div>
                      <div class="col-md-12">
                          <label for="objetion_response" class="form-text text-muted font-weight-bold">Tipo de
                              objeción:</label>
                          <nb-select fullWidth placeholder="Seleccione..." formControlName="objetion_response_id">
                              <nb-option value="">Seleccione...</nb-option>
                              <nb-option *ngFor="let item of objetion_response" [value]="item.id">{{ item.name }}
                              </nb-option>
                          </nb-select>
                      </div>
                      <div class="col-md-12">
                          <label for="observation" class="form-text text-muted font-weight-bold">Agregar
                              Evicencias:</label>
                      </div>
                      <!-- <div class="file-select-evicencias" id="src-file1">
                          <input [nbSpinner]="loading" class="file" accept="image/*,.pdf" type="file" id="file" file
                              fullWidth (change)="changeFile($event,2)" />
                      </div> -->
                      <div class="col-md-12">
                          <input type="text" nbInput fullWidth id="file" formControlName="file" file
                              status="{{ isSubmitted && ResponseConciliationsForm.controls.file.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
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
<ng-template #stateCartera>
<div class="container-fluid">
    <nb-card style="width: 430px;" [nbSpinner]="loading">
        <nb-card-header>Cambiar estado de glosa</nb-card-header>
        <nb-card-body>
            <form [formGroup]="SustainGlossForm" (ngSubmit)="saveCartera()">
                <div>
                    <div class="col-md-12">
                        <label for="response" class="form-text text-muted font-weight-bold">Respuesta:</label>
                        <input oninput="this.value = this.value.toUpperCase()" minlength="5" nbInput fullWidth
                            id="response" formControlName="response" response
                            status="{{ isSubmitted && SustainGlossForm.controls.response.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                    </div>
                    <div class="col-md-12">
                          <label for="file" class="form-text text-muted font-weight-bold">Codigo del acta:</label>
                          <input type="text" nbInput fullWidth id="file" formControlName="file" file
                            status="{{ isSubmitted && SustainGlossForm.controls.file.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                    </div>
                </div>
                <div class="div-send">
                    <button type="submit" nbButton status="success">Sostener</button>
                </div>
            </form>
        </nb-card-body>
    </nb-card>
</div>
</ng-template>
<ng-template #detailAction>
    <div class="container-fluid">
        <nb-card style="width: 450px; max-height: 800px; overflow: auto;">
            <nb-card-header >Detalles de glosa</nb-card-header>
            <nb-card-body>
                <div  *ngIf="gloss_response" >
                    <div class="col-md-12">
                       <p class="text-muted title" >Respuesta de glosa/devolución</p>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Fecha de
                                respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{gloss_response[0].response_date}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{gloss_response[0].response}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Valor aceptado:
                            </label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{currency.transform(gloss_response[0].accepted_value)}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Valor no
                                aceptado:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{currency.transform(gloss_response[0].value_not_accepted)}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Descripcion:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{gloss_response[0].objetion_code_response.name}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Tipo de
                                objeción:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{gloss_response[0].objetion_response.name}}
                        </div>
                        <div class="col-md-12" >
                            <label for="observation" class="form-text text-muted font-weight-bold">Evidencia de
                                respuesta:</label>
                        </div>
                        <div  class="col-md-12">
                            <label></label> {{gloss_response[0].file}}
                        </div>

                    </div>
                    <div class="col-md-12" *ngIf="sustain">

                      <p class="text-muted title" >Glosa sostenida</p>

                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Fecha de
                                respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{sustain.response_date}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{sustain.response}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Evidencia de
                                respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{sustain.file}}
                        </div>

                    </div>
                    <div class="col-md-12" *ngIf="showConciliation">

                      <p class="text-muted title">Respuesta de conciliación</p>

                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Fecha de
                                respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{conciliation_response[arraylength].response_date}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{conciliation_response[arraylength].response}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Valor aceptado:
                            </label>
                        </div>
                        <div class="col-md-12">
                            <label></label>
                            {{currency.transform(conciliation_response[arraylength].accepted_value)}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Valor no
                                aceptado:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label>
                            {{currency.transform(conciliation_response[arraylength].value_not_accepted)}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Descripcion:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{conciliation_response[arraylength].objetion_code_response.name}}
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Tipo de
                                objeción:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{conciliation_response[arraylength].objetion_response.name}}
                        </div>
                        <div class="col-md-12" >
                            <label for="observation" class="form-text text-muted font-weight-bold">Evidencia de
                                respuesta:</label>
                        </div>
                        <div class="col-md-12">
                            <label></label> {{conciliation_response[arraylength].file}}
                        </div>
                    </div>
                </div>
            </nb-card-body>
        </nb-card>
    </div>
</ng-template>
  `,
  styleUrls: ['./conciliations-list.component.scss'],
})
export class Actions3Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public ResponseConciliationsForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public SustainGlossForm: FormGroup;
  public dialog;
  public gloss_response_id;
  public conciliation_response_id;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public gloss_response: any[] = null;
  public conciliation_response: any[] = null;
  public previewFileResponse = null;
  public previewFileRadication = null;
  public ShowPlus: boolean = null;
  public showSustain: boolean = false;
  public showConciliation: boolean = false;
  public sustain: any[] = null;
  public arraylength = null;

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private GlossResponseS: GlossResponseService,
    private GlossRadicationS: GlossRadicationService,
    private ConciliationResponseS: ConciliationResponseService,
    private GlossS: GlossService,
    private currency: CurrencyPipe,
    private objetionCodeResponseS: ObjetionCodeResponseService,
    private objetionResponseS: ObjetionResponseService,
  ) {
  }

  async ngOnInit() {
    // if(this.value.currentRole == 4 || this.value.currentRole == 5){
    //   if (this.value.data.gloss_status_id == 3 || this.value.data.gloss_status_id==2) {
    //     this.SustainGlossForm = this.formBuilder.group({
    //       state_gloss: [Validators.compose([Validators.required])],
    //     });
    //     this.ShowPlus = true;
    //   }
    // }

    if (!this.rowData) {
      this.rowData = {
        response: '',
        accepted_value: '',
        value_not_accepted: '',
        objetion_code_response_id: '',
        objetion_response_id: '',
        justification_status: '',
        observation: '',
        file: '',
      }
    }


    if (this.value.data.gloss_status_id != 5) {
      this.ResponseConciliationsForm = this.formBuilder.group({
        justification_status: [this.rowData.justification_status, Validators.compose([Validators.required])],
        response: [this.rowData.response, Validators.compose([Validators.required])],
        accepted_value: [this.rowData.accepted_value, Validators.compose([Validators.required])],
        value_not_accepted: [this.rowData.value_not_accepted, Validators.compose([Validators.required])],
        objetion_code_response_id: [this.rowData.objetion_code_response_id, Validators.compose([Validators.required])],
        objetion_response_id: [this.rowData.objetion_response_id, Validators.compose([Validators.required])],
        file: [this.rowData.file, Validators.compose([Validators.required])],
      });

      this.SustainGlossForm = this.formBuilder.group({
        response: [this.rowData.response, Validators.compose([Validators.required])],
        file: [this.rowData.file, Validators.compose([Validators.required])],
      });
    }



    // if (this.value.data.gloss_status_id == 2) {
    //   this.RadicationGlossForm = this.formBuilder.group({
    //     observation: [this.rowData.observation, Validators.compose([Validators.required])],
    //     file: [this.rowData.file, Validators.compose([Validators.required])],
    //   });
    // }


  }

  // async getColectionResponse(id, id_con?) {
  //   await this.GlossResponseS.GetCollection({ gloss_id: id }).then(x => {
  //     if (x.length != 0) {
  //       this.gloss_response_id = x[0].id;
  //     }
  //   });
  //   if (this.value.data.gloss_status_id == 7 || this.value.data.gloss_status_id == 8) {
  //     await this.ConciliationResponseS.GetCollection({ gloss_id: id }).then(x => {
  //       if (x.length != 0) {
  //         this.conciliation_response_id = x[0].id;
  //       }
  //     });
  //   }

  // }
  // async getColectionConciliation(id) {
  //   if (this.value.data.gloss_status_id == 7 || this.value.data.gloss_status_id == 8) {
  //     await this.ConciliationResponseS.GetCollection({ gloss_id: id }).then(x => {
  //       if (x.length != 0) {
  //         this.conciliation_response_id = x[0].id;
  //       }
  //     });
  //   }
  // }

  async ConfirmAction(dialog: TemplateRef<any>, status?, id?) {

    this.dialog = this.dialogService.open(dialog);
    if (status == 1) {
      this.GetResponseParam()
    } else if (status == 2 && (!this.gloss_response || !this.conciliation_response)) {
      await Promise.all([
        this.GetAuxData(),
      ]);
    }
    // if (this.value.data.id != null) {
    //   // this.getColectionResponse(this.value.data.id, this.value.data.id_conciliation);
    // }

  }

  async GetAuxData() {
    if (this.value.data.gloss_status_id == 7 || this.value.data.gloss_status_id == 8) {
      await this.ConciliationResponseS.GetCollection({ gloss_id: this.value.data.id }).then(x => {
        this.conciliation_response = x;
        this.arraylength = this.conciliation_response.length - 1;
        if (this.value.data.gloss_status_id == 7) {
          this.sustain = this.conciliation_response[0];
        } else {
          this.sustain = this.conciliation_response[0];
          this.showConciliation=true;
        }
      });
    }
    await this.GlossResponseS.GetCollection({ gloss_id: this.value.data.id }).then(x => {
      this.gloss_response = x;

      // this.previewFileResponse = this.gloss_response[0].file;

    });
    return Promise.resolve(true);
  }

  GetResponseParam() {
    if (!this.objetion_code_response || !this.objetion_response) {
      this.objetionCodeResponseS.GetCollection().then(x => {
        this.objetion_code_response = x;
      });
      this.objetionResponseS.GetCollection().then(x => {
        this.objetion_response = x;
      });
    }
  }

  compareFacture() {
    var accepted = +this.ResponseConciliationsForm.controls.accepted_value.value;
    var not_accepted = +this.ResponseConciliationsForm.controls.value_not_accepted.value
    var result = accepted + not_accepted;
    var compare = this.value.data.objeted_cons_value;
    if (compare == result) {
      this.ResponseConciliationsForm.controls.accepted_value.setErrors(null);
      this.ResponseConciliationsForm.controls.value_not_accepted.setErrors(null);
    } else {
      this.toastService.warning('', 'El valor objetado no coincide con los valores de la factura')
      this.ResponseConciliationsForm.controls.accepted_value.setErrors({ 'incorrect': true });
      this.ResponseConciliationsForm.controls.value_not_accepted.setErrors({ 'incorrect': true });
    }
  }


  saveGroup() {
    this.compareFacture();

    // 
    this.isSubmitted = true;
    if (!this.ResponseConciliationsForm.invalid) {
      this.loading = true;
      if (this.value.data.id) {
        if (this.ResponseConciliationsForm.value.file) {
          var formData = new FormData();
          formData.append('single', "1");
          formData.append('type_response', "0");
          formData.append('response', this.ResponseConciliationsForm.value.response);
          formData.append('file', this.ResponseConciliationsForm.controls.file.value);
          formData.append('gloss_conciliations_id', this.value.data.id_conciliation);
          formData.append('gloss_id', this.value.data.id);
          formData.append('justification_status', this.ResponseConciliationsForm.value.justification_status);
          formData.append('objetion_response_id', this.ResponseConciliationsForm.controls.objetion_response_id.value);
          formData.append('objetion_code_response_id', this.ResponseConciliationsForm.controls.objetion_code_response_id.value);
          formData.append('accepted_value', this.ResponseConciliationsForm.controls.accepted_value.value);
          formData.append('value_not_accepted', this.ResponseConciliationsForm.controls.value_not_accepted.value);
          this.ConciliationResponseS.Save(formData).then(x => {
            this.value.refresh();
            this.dialog.close();
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;

          });
        } else {
          this.dialog = this.dialog.close();
          this.ConciliationResponseS.Save({
            id: this.value.data.id,
            gloss_id: this.value.data.id,
            objetion_response_id: this.ResponseConciliationsForm.controls.objetion_response_id.value,
            objetion_code_response_id: this.ResponseConciliationsForm.controls.objetion_code_response_id.value,
            accepted_value: this.ResponseConciliationsForm.controls.accepted_value.value,
            value_not_accepted: this.ResponseConciliationsForm.controls.value_not_accepted.value,
            file: this.ResponseConciliationsForm.controls.file.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.value.refresh();
            this.dialog.close();

            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
        //this.value.refresh();
      }
    }
    //this.value.refresh();
  }

  // saveRadication() {
  //   this.isSubmitted = true;
  //   if (!this.RadicationGlossForm.invalid) {
  //     this.loading = true;
  //     if (this.value.data.id) {
  //       if (this.RadicationGlossForm.value.file) {
  //         var formData = new FormData();
  //         formData.append('single', "1");
  //         formData.append('type_response', "0");
  //         formData.append('response', this.ResponseConciliationsForm.value.response);
  //         formData.append('file', this.ResponseConciliationsForm.controls.file.value);
  //         formData.append('id', this.rowData.id);
  //         formData.append('gloss_id', this.value.data.id);
  //         formData.append('justification_status', this.ResponseConciliationsForm.value.justification_status);
  //         formData.append('objetion_response_id', this.ResponseConciliationsForm.controls.objetion_response_id.value);
  //         formData.append('objetion_code_response_id', this.ResponseConciliationsForm.controls.objetion_code_response_id.value);
  //         formData.append('accepted_value', this.ResponseConciliationsForm.controls.accepted_value.value);
  //         formData.append('value_not_accepted', this.ResponseConciliationsForm.controls.value_not_accepted.value);
  //         this.dialog = this.dialog.close();
  //         this.GlossRadicationS.Save(formData).then(x => {
  //           this.value.refresh();
  //           this.toastService.success('', x.message);
  //           this.dialog.close();
  //           if (this.saved) {
  //             this.saved();
  //           }
  //         }).catch(x => {
  //           this.isSubmitted = false;
  //           this.loading = false;
  //         });
  //       } else {
  //         this.dialog = this.dialog.close();
  //         this.GlossRadicationS.Save({
  //           gloss_response_id: this.gloss_response_id,
  //           observation: this.RadicationGlossForm.controls.observation.value,
  //           gloss_id: this.value.data.id
  //         }).then(x => {
  //           this.value.refresh();
  //           this.toastService.success('', x.message);
  //           this.dialog.close();
  //           if (this.saved) {
  //             this.saved();
  //           }
  //         }).catch(x => {
  //           this.isSubmitted = false;
  //           this.loading = false;
  //         });
  //       }
  //       //    this.value.refresh();
  //     }

  //   }
  // }

  saveCartera() {
    this.isSubmitted = true;
    if (!this.SustainGlossForm.invalid) {
      this.loading = true;
      var formData = new FormData();
      formData.append('single', "1");
      formData.append('type_response', "1");
      formData.append('response', this.SustainGlossForm.value.response);
      formData.append('gloss_conciliations_id', this.value.data.id_conciliation);
      formData.append('gloss_id', this.value.data.id);
      formData.append('file', this.SustainGlossForm.controls.file.value);
      this.ConciliationResponseS.Save(formData).then(x => {
        this.toastService.success('', x.message);
        this.value.refresh();
        this.dialog.close();
        if (this.saved) {
          this.saved();
        }
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    }
  }


  async changeFile(files, option) {
    this.loading = true;
    if (!files) return false;
    const file = await this.toBase64(files.target.files[0]);

    switch (option) {
      case 2:
        this.ResponseConciliationsForm.patchValue({
          file: files.target.files[0],
        });
        this.loading = false;
        break;
      case 3:
        this.RadicationGlossForm.patchValue({
          file: files.target.files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
