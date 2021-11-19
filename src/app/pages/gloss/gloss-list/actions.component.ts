import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { GlossService } from '../../../business-controller/gloss.service';
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
    <a *ngIf="value.data.gloss_status_id==1" nbButton ghost (click)="ConfirmAction(confirmAction)" title="Respuesta">
        <nb-icon icon="checkmark-square-outline"></nb-icon>
    </a>
    <a *ngIf="value.data.gloss_status_id==2" nbButton ghost (click)="ConfirmAction(radicationAction)" title="Radicación">
        <nb-icon icon="paper-plane-outline"></nb-icon>
    </a>
    <a *ngIf="value.data.gloss_status_id==3" nbButton ghost (click)="ConfirmAction(detailAction)" title="Ver Respuesta">
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
                            <label for="accepted_value" class="form-text text-muted font-weight-bold">Valor
                                aceptado:</label>
                            <input nbInput fullWidth id="accepted_value" formControlName="accepted_value" accepted_value
                                status="{{ isSubmitted && form.controls.accepted_value.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                        </div>
                        <div class="col-md-12">
                            <label for="value_not_accepted" class="form-text text-muted font-weight-bold">Valor No
                                aceptado:</label>
                            <input nbInput fullWidth id="value_not_accepted" formControlName="value_not_accepted"
                                value_not_accepted
                                status="{{ isSubmitted && form.controls.value_not_accepted.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
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
                        <label for="objetion_response" class="form-text text-muted font-weight-bold">Pertinente o Injustificado:</label>
                            <nb-select fullWidth placeholder="Seleccione..."
                                formControlName="objetion_response_id">
                                <nb-option value="">Seleccione...</nb-option>
                                <nb-option *ngFor="let item of objetion_response" [value]="item.id">{{ item.name }}
                                </nb-option>
                            </nb-select>
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
          <nb-card-header>Radicar Glosa</nb-card-header>
          <nb-card-body>
              <div class="row">
                  <div class="col-md-12">
                      <label>Fecha de respuesta: </label>{{gloss_response[0].response_date}}
                  </div>
                  <div class="col-md-12">
                      <label>Valor aceptado: </label> {{gloss_response[0].accepted_value}}
                  </div>
                  <div class="col-md-12">
                      <label>Valor no aceptado: </label>{{gloss_response[0].value_not_accepted}}
                  </div>
                  <div class="col-md-12">
                      <label>Descripcion: </label>{{gloss_response[0].objetion_code_response.name}}
                  </div>
                  <div class="col-md-12">
                      <label>Pertinente o Injustificado: </label>{{gloss_response[0].objetion_response.name}}
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
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public objetion_code_response: any[];
  public objetion_response: any[];
  public gloss_response: any[];

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private GlossResponseS: GlossResponseService,
    private GlossRadicationS: GlossRadicationService,
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
      }
    };

    this.objetionCodeResponseS.GetCollection().then(x => {
      this.objetion_code_response = x;
    });
    this.objetionResponseS.GetCollection().then(x => {
      this.objetion_response = x;
    });
    this.GlossResponseS.GetCollection({gloss_id:this.value.data.id}).then(x => {
      this.gloss_response_id = x[0].id;
      this.gloss_response = x;
    });

    this.ResponseGlossForm = this.formBuilder.group({
      accepted_value: [this.rowData.accepted_value, Validators.compose([Validators.required])],
      value_not_accepted: [this.rowData.value_not_accepted, Validators.compose([Validators.required])],
      objetion_code_response_id: [this.rowData.objetion_code_response_id, Validators.compose([Validators.required])],
      objetion_response_id: [this.rowData.objetion_response_id, Validators.compose([Validators.required])],
    });

    this.RadicationGlossForm = this.formBuilder.group({
      observation: [this.rowData.observation, Validators.compose([Validators.required])],
    });
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  saveGroup() {
    this.isSubmitted = true;
    if (!this.ResponseGlossForm.invalid) {
      this.loading = true;
      if (this.rowData.id) {
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
          //this.gloss_response_id = x.data.gloss_response.id;
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
    this.value.refresh();
  }

  saveRadication() {
    this.isSubmitted = true;
    if (!this.RadicationGlossForm.invalid) {
      this.loading = true;
      if (this.rowData.id) {
        this.dialog = this.dialog.close();
        this.GlossRadicationS.Save({
          gloss_response_id: this.gloss_response_id,
          observation: this.RadicationGlossForm.controls.observation.value,
          gloss_id:this.value.data.id
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
    this.value.refresh();
  }
}
