import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ObservationsComponent} from '../observations-component';
import {InscriptionBusinessServices} from '../../../business-controller/inscription-business.services';

@Component({
  template: `
    <div>
      <nb-card class='m-0'>
        <nb-card-body>
          <div class='row'>
            <div class='col-12 col-md-9 col-lg-6 d-flex flex-column'>
              <span class='lead my-1 font-weight-bold' style="font-size: 1em">{{ value.data.nombre_completo }}</span>
              <span class='lead mb-2 font-weight-lighter' style="font-size: .9em">{{ value.data.identification }}
                , {{ value.data.email }}</span>
              <span class='lead mb-1' style="font-size: .9em">Especialidad: {{ value.data.specialty }}</span>
              <span class='lead mb-1' style="font-size: .9em">Municipio: {{ value.data.municipality }}</span>
              <span class='lead mb-1' style="font-size: .9em">Entidad: {{ value.data.entity }}</span>
              <span class='lead mb-1' style="font-size: .9em">Cargo: {{ value.data.position }}</span>
            </div>
            <div
              class='col-12 col-md-3 col-lg-6 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0'>
              <!--<button nbButton status='info' fullWidth class='mb-2' (click)='VerDetalle(value.data)'>Ver detalles
              </button>-->
              <div class="row">
                <div class="col-12">Programas inscritos</div>
              </div>

              <div class="row mt-2" *ngIf="!value.data.categories.length">
                <div class="col-12">
                  No se han encontrado programas
                </div>
              </div>

              <div class="row" *ngIf="value.data.categories.length">
                <div class="col-12 my-2 d-flex flex-column" *ngFor="let category of value.data.categories">
                <div *ngIf="category.pivot.inscription_status_id!=1">  
                <span>{{ category.name }}</span>
                  <span>{{ category.created_at }}</span>
                  <div class="d-flex mt-1">
                    <button
                      *ngFor="let status of value.inscriptionStatus;index as indexOfelement;"
                      nbButton type="button" size="tiny"
                      [status]="category.pivot.inscription_status_id == status.id ? 'info' : ''"
                      [style]="indexOfelement === 0 ? 'border-right: 0; border-bottom-right-radius: 0; border-top-right-radius: 0' :
                        indexOfelement === value.inscriptionStatus.length - 1 ? 'border-left: 0; border-bottom-left-radius: 0; border-top-left-radius: 0'
                        : ''"
                      (click)="UpdateStatus(category, status.id)"
                    >
                      {{ status.name }}
                    </button>

                    <div class="d-flex w-100 justify-content-end">
                      <button nbButton status="info" class="float-right" size="tiny"
                              (click)="AddObservation(category.pivot)">
                        {{ category.pivot.observation && category.pivot.observation != '' ? 'Cambiar' : 'Agregar' }}
                        observación
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

          </div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
})
export class CardAdmissionsComponent implements ViewCell {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(
    private dialogService: NbDialogService,
    private inscriptionBs: InscriptionBusinessServices,
    private toastS: NbToastrService,
  ) {
  }

  AddObservation(data) {
    this.dialogService.open(ObservationsComponent, {
      context: {
        data,
      },
    });
  }

  UpdateStatus(data, status_id) {
    data.pivot.inscription_status_id = status_id;
    data.pivot.email = this.value.data.email;
    data.pivot.name = this.value.data.name;
    this.inscriptionBs.QualifyTeacher(data.pivot).then(x => {
      this.toastS.success(null, x.message);
      // this.dialogRef.close();
      // this.loading = false;
    }).catch(x => {
      this.toastS.danger(null, x.message);
      // this.loading = false;
    });
  }
}
