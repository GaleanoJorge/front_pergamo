import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ObservationsComponent} from '../../observations-component';
import {InscriptionBusinessServices} from '../../../../business-controller/inscription-business.services';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../../../../models/group';

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
                <div class="col-12">
                  Estado de la inscripción
                </div>
              </div>

              <div class="row" *ngFor="let course of value.data.course">
                <div class="col-12" style="display:flex">
                  <div class="d-flex mt-1" *ngFor="let status of value.inscriptionStatus;index as indexOfelement;">
                    <button [disabled]="course.pivot.inscription_status_id==1 || course.pivot.inscription_status_id==2"
                      nbButton type="button" size="tiny" *ngIf="status.id!=3"
                      [status]="course.pivot.inscription_status_id == status.id ? 'info' : ''"
                      [style]="indexOfelement === 0 ? 'border-right: 0; border-bottom-right-radius: 0; border-top-right-radius: 0' :
                        indexOfelement === value.inscriptionStatus.length - 1 ? 'border-left: 0; border-bottom-left-radius: 0; border-top-left-radius: 0'
                        : ''"
                      (click)="UpdateStatus(course, status.id)"                 
                    >
                      {{ status.name }}
                    </button>


                  </div>
                  <div class="d-flex w-100 justify-content-end pl-2">
                  <button nbButton status="info" class="float-right" size="tiny"
                          (click)="AddObservation(course.pivot)">
                    {{ course.pivot.observation && course.pivot.observation != '' ? 'Cambiar' : 'Agregar' }}
                    observación
                  </button>
                </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-12">
                  Grupo
                </div>
              </div>

              <div class="row" *ngFor="let course of value.data.course">
                <div class="col-12">
                  <nb-select [disabled]="btnDisable" [selected]="value.data.group_id" placeholder="Asignar a un grupo"
                             (selectedChange)="ChangeGroup($event, course)">
                    <nb-option *ngFor="let group of value.groups" [value]="group.id">{{ group.name }}</nb-option>
                  </nb-select>
                </div>
              </div>
            </div>

          </div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
})
export class CardStudentsAdmissionsComponent implements ViewCell, OnInit {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  private btnDisable: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private inscriptionBs: InscriptionBusinessServices,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    console.log(this.value);
    for(let i=0;i<this.value.data.courses.length;i++){
      if(this.value.data.courses[i].coursebase_id==this.route.snapshot.params.course_id){
        this.value.data.course=[];
        this.value.data.course[0]=this.value.data.courses[i];
      }
    }
  }

  AddObservation(data) {
    this.dialogService.open(ObservationsComponent, {
      context: {
        data,
        user: 'student',
      },
    });
  }

  UpdateStatus(data, status_id) {
    if (status_id == 1 && this.value.data.user_role_group_id == null) {
      this.btnDisable=false;
      this.toastS.danger(null, 'Debe asignar un grupo');
    } else if(status_id == 2){
      this.btnDisable=true;
      data.pivot.inscription_status_id = status_id;
      data.pivot.email=this.value.data.email;
      data.pivot.name=this.value.data.name;
      this.inscriptionBs.QualifyStudent(data.pivot).then(x => {
        this.toastS.success(null, x.message);
      }).catch(x => {
        this.toastS.danger(null, x.message);
      });
    }else{
      data.pivot.inscription_status_id = status_id;
      data.pivot.email=this.value.data.email;
      data.pivot.name=this.value.data.name;
      this.inscriptionBs.QualifyStudent(data.pivot).then(x => {
        this.toastS.success(null, x.message);
      }).catch(x => {
        this.toastS.danger(null, x.message);
      });
    }
  }

  ChangeGroup($event, course) {
    console.log(course);
    course.pivot.group_id = $event;
    course.pivot.user_role_group_id = this.value.data.user_role_group_id;
    
    this.inscriptionBs.QualifyStudent(course.pivot).then(x => {
      this.value.data.user_role_group_id = x.data.inscription.user_role_group_id;
      course.pivot.user_role_group_id = x.data.inscription.user_role_group_id;
      this.toastS.success(null, x.message);
    }).catch(x => {
      this.toastS.danger(null, x.message);
    });

  }

}
