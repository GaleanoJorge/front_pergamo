import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import {CurrencyPipe} from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="value.data.gloss_status_id==1" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
    </button>
    <button *ngIf="value.data.gloss_status_id==1" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
    </button>
    <a *ngIf="value.data.gloss_status_id==1" nbButton ghost (click)="ConfirmAction(confirmAction,1)" title="Respuesta">
        <nb-icon icon="checkmark-square-outline"></nb-icon>
    </a>
    <a *ngIf="value.data.gloss_status_id==2" nbButton ghost (click)="ConfirmAction(radicationAction,2, value.data.id)" title="Radicación">
        <nb-icon icon="paper-plane-outline"></nb-icon>
    </a>
    <a *ngIf="value.data.gloss_status_id==3" nbButton ghost (click)="ConfirmAction(detailAction,3)" title="Ver Respuesta">
        <nb-icon icon="eye-outline"></nb-icon>
    </a>
  </div>
  <ng-template #confirmAction>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Responder Glosa</nb-card-header>
            <nb-card-body>
                <form [formGroup]="ResponseGlossForm" (ngSubmit)="saveGroup()">
                    <div>
                        <div class="col-md-12">
                            <label for="accepted_value" class="form-text text-muted font-weight-bold">Valor aceptado:</label>
                            <input nbInput fullWidth id="accepted_value" formControlName="accepted_value" accepted_value
                                status="{{ isSubmitted && ResponseGlossForm.controls.accepted_value.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                        </div>
                        <div class="col-md-12">
                            <label for="value_not_accepted" class="form-text text-muted font-weight-bold">Valor No aceptado:</label>
                            <input nbInput fullWidth id="value_not_accepted" formControlName="value_not_accepted"
                                value_not_accepted
                                status="{{ isSubmitted && ResponseGlossForm.controls.value_not_accepted.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                        </div>
                        <div class="col-md-12">
                            <label for="objetion_code_response" class="form-text text-muted font-weight-bold">Descripción Respuesta:</label>
                            <nb-select fullWidth placeholder="Seleccione..."
                                formControlName="objetion_code_response_id">
                                <nb-option value="">Seleccione...</nb-option>
                                <nb-option *ngFor="let item of objetion_code_response" [value]="item.id">{{ item.name }}
                                </nb-option>
                            </nb-select>
                        </div>
                        <div class="col-md-12">
                        <label for="objetion_response" class="form-text text-muted font-weight-bold">Tipo de objeción:</label>
                            <nb-select fullWidth placeholder="Seleccione..."
                                formControlName="objetion_response_id">
                                <nb-option value="">Seleccione...</nb-option>
                                <nb-option *ngFor="let item of objetion_response" [value]="item.id">{{ item.name }}
                                </nb-option>
                            </nb-select>
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Agregar Evicencias:</label>
                        </div>
                        <div class="file-select-evicencias" id="src-file1">
                          <input class="file" accept="image/*,.pdf" type="file" id="file" file fullWidth
                            (change)="changeFile($event,2)" />
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
  <ng-template #radicationAction>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Radicar Glosa</nb-card-header>
            <nb-card-body>
                <form [formGroup]="RadicationGlossForm" (ngSubmit)="saveRadication()">
                    <div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Observaciones:</label>
                            <input nbInput fullWidth id="observation" formControlName="observation" observation
                                status="{{ isSubmitted && RadicationGlossForm.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Agregar Evicencias:</label>
                        </div>
                        <div class="file-select-evicencias" id="src-file2">
                          <input class="file" accept="image/*,.pdf" type="file" id="file" file fullWidth
                            (change)="changeFile($event,3)" />
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
  <ng-template #detailAction>
    <div class="container-fluid">
      <nb-card style="width: 430px;">
          <nb-card-header>Detalles Respuesta Glosa</nb-card-header>
          <nb-card-body>
              <div class="row" *ngIf="gloss_response">
                  <div class="col-md-12">
                      <label for="observation" class="form-text text-muted font-weight-bold">Fecha de respuesta:</label>
                  </div>
                  <div class="col-md-12">
                      <label></label> {{gloss_response[0].response_date}}
                  </div>
                  <div class="col-md-12">
                      <label for="observation" class="form-text text-muted font-weight-bold">Valor aceptado: </label>
                  </div>
                  <div class="col-md-12">
                      <label></label> {{currency.transform(gloss_response[0].accepted_value)}}
                  </div>
                  <div class="col-md-12">
                      <label for="observation" class="form-text text-muted font-weight-bold">Valor no aceptado:</label>
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
                      <label for="observation" class="form-text text-muted font-weight-bold">Tipo de objeción:</label>
                  </div>
                  <div class="col-md-12">
                      <label></label> {{gloss_response[0].objetion_response.name}}
                  </div>
                  <div class="col-md-12" *ngIf="previewFileResponse">
                      <label for="observation" class="form-text text-muted font-weight-bold">Evidencia de respuesta:</label>
                  </div>
                  <div *ngIf="previewFileResponse" class="container py-2">
                    <a [href]="previewFileResponse" target="_blank">Ver documento respuesta</a>
                  </div>
                  <div class="col-md-12" *ngIf="previewFileRadication">
                      <label for="observation" class="form-text text-muted font-weight-bold">Evidencia de radicación:</label>
                  </div>
                  <div *ngIf="previewFileRadication" class="container py-2">
                    <a [href]="previewFileRadication" target="_blank">Ver documento radicación</a>
                  </div>
              </div>
          </nb-card-body>
      </nb-card>
  </div>
</ng-template>
  `,
  styleUrls: ['./gloss-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public dialog;
  public gloss_response_id;
  public loading: boolean = true;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public gloss_response: any[] = null;
  public gloss_radication: any[] = null;
  public previewFileResponse = null;
  public previewFileRadication = null;

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private GlossResponseS: GlossResponseService,
    private GlossRadicationS: GlossRadicationService,
    private currency: CurrencyPipe,
    private objetionCodeResponseS: ObjetionCodeResponseService,
    private objetionResponseS: ObjetionResponseService,
  ) {
  }

  async ngOnInit() {
    if (!this.rowData) {
      this.rowData = {
        accepted_value: '',
        value_not_accepted: '',
        objetion_code_response_id: '',
        objetion_response_id: '',
        observation: '',
        file: '',
      }
    }
    

    if (this.value.data.gloss_status_id == 1) {
      this.ResponseGlossForm = this.formBuilder.group({
        accepted_value: [this.rowData.accepted_value, Validators.compose([Validators.required])],
        value_not_accepted: [this.rowData.value_not_accepted, Validators.compose([Validators.required])],
        objetion_code_response_id: [this.rowData.objetion_code_response_id, Validators.compose([Validators.required])],
        objetion_response_id: [this.rowData.objetion_response_id, Validators.compose([Validators.required])],
        file: [this.rowData.file, Validators.compose([Validators.required])],
      });
    }

    if (this.value.data.gloss_status_id == 2) {
      this.RadicationGlossForm = this.formBuilder.group({
        observation: [this.rowData.observation, Validators.compose([Validators.required])],
        file: [this.rowData.file, Validators.compose([Validators.required])],
      });
    }
  }

  async getColectionResponse(id) {
    await this.GlossResponseS.GetCollection({ gloss_id: id }).then(x => {
      this.gloss_response_id = x[0].id;
    });
  }

  ConfirmAction(dialog: TemplateRef<any>, status, id?) {

    this.dialog = this.dialogService.open(dialog);
    if (status == 1) {
      this.GetResponseParam()
    } else if (status == 3 && !this.gloss_response) {
      this.GlossResponseS.GetCollection({ gloss_id: this.value.data.id }).then(x => {
        this.gloss_response = x;
        var resId = this.gloss_response[0].id;
        this.previewFileResponse = environment.storage + this.gloss_response[0].file;
        this.GlossRadicationS.GetCollection({ gloss_response_id: resId }).then(x => {
          this.gloss_radication = x;
          this.previewFileRadication = environment.storage + this.gloss_radication[0].file;
          this.loading = false;
        });
      });
    }
    if (id != null) {
      this.getColectionResponse(id);
    }
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

  saveGroup() {
    this.isSubmitted = true;
    if (!this.ResponseGlossForm.invalid) {
      this.loading = true;
      if (this.rowData.id) {
        if (this.ResponseGlossForm.value.file) {
          var formData = new FormData();
          formData.append('file', this.ResponseGlossForm.value.file);
          formData.append('id', this.rowData.id);
          formData.append('gloss_id', this.value.data.id);
          formData.append('objetion_response_id', this.ResponseGlossForm.controls.objetion_response_id.value);
          formData.append('objetion_code_response_id', this.ResponseGlossForm.controls.objetion_code_response_id.value);
          formData.append('accepted_value', this.ResponseGlossForm.controls.accepted_value.value);
          formData.append('value_not_accepted', this.ResponseGlossForm.controls.value_not_accepted.value);
          this.dialog = this.dialog.close();
          this.GlossResponseS.Save(formData).then(x => {
            this.toastService.success('', x.message);
            this.dialog.close();
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          this.dialog = this.dialog.close();
          this.GlossResponseS.Save({
            id: this.rowData.id,
            gloss_id: this.value.data.id,
            objetion_response_id: this.ResponseGlossForm.controls.objetion_response_id.value,
            objetion_code_response_id: this.ResponseGlossForm.controls.objetion_code_response_id.value,
            accepted_value: this.ResponseGlossForm.controls.accepted_value.value,
            value_not_accepted: this.ResponseGlossForm.controls.value_not_accepted.value,
          }).then(x => {
            this.toastService.success('', x.message);
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
    }
    this.value.refresh();
  }

  saveRadication() {
    this.isSubmitted = true;
    if (!this.RadicationGlossForm.invalid) {
      this.loading = true;
      if (this.rowData.id) {
        if (this.RadicationGlossForm.value.file) {
          var formData = new FormData();
          formData.append('file', this.RadicationGlossForm.value.file);
          formData.append('gloss_response_id', this.gloss_response_id);
          formData.append('observation', this.RadicationGlossForm.controls.observation.value);
          formData.append('gloss_id', this.value.data.id);
          this.dialog = this.dialog.close();
          this.GlossRadicationS.Save(formData).then(x => {
            this.toastService.success('', x.message);
            this.dialog.close();
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          this.dialog = this.dialog.close();
          this.GlossRadicationS.Save({
            gloss_response_id: this.gloss_response_id,
            observation: this.RadicationGlossForm.controls.observation.value,
            gloss_id: this.value.data.id
          }).then(x => {
            this.toastService.success('', x.message);
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
    }
    this.value.refresh();
  }

  async changeFile(files, option) {
    if (!files) return false;

    const file = await this.toBase64(files.target.files[0]);
    
    switch (option) {
      case 2:
        this.ResponseGlossForm.patchValue({
          file: files.target.files[0],
        });
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
