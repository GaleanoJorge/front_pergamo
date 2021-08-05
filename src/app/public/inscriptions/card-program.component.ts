import { Component, Input, OnInit,TemplateRef  } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { DetailCourseComponent } from './detail-course.component';
import { AuthService } from '../../services/auth.service';
import { DateFormatPipe } from '../../pipe/date-format.pipe';


@Component({
  template: `
    <div>
      <nb-card class='m-0'>
        <nb-card-body>
          <div class='row'>
            <div class='col-12 col-md-9 col-lg-10 d-flex flex-column'>
              <span class='lead my-1 font-weight-bold' style="font-size: 1.3em;color: #002775;">{{ value.data.curso }}</span>
              <span *ngIf="value.data.category.category; else elseBlock" class='lead mb-2 font-weight-bold' style="font-size: 1.2em">Programa: {{ value.data.category.category.name }}</span>
              <ng-template #elseBlock><span class='lead mb-2 font-weight-bold' style="font-size: 1.2em">{{ value.data.programa }}</span></ng-template>
              <span *ngIf="value.data.category.name && value.data.category.category_parent_id!=null; else elseBlock2" class='lead mb-2 font-weight-bold' style="font-size: 1.2em">Subprograma: {{ value.data.category.name }}</span>
              <ng-template #elseBlock2><span class='lead mb-2 font-weight-bold' style="font-size: 1.2em">Subprograma: No aplica</span></ng-template>
              <span class='lead mb-1' style="font-size: 1.2em">Sede: {{ value.data.sede }}</span>
              <span class='lead mb-1' style="font-size: 1.2em">Modalidad: {{ value.data.tipo }}</span>
              <span class='lead mb-1 font-weight-light'
                    style='font-size: .9em'>Fecha Inicio: {{ datePipe.transform(value.data.start_date) }}</span>
              <span class='lead font-weight-light'
                    style='font-size: .9em'>Fecha Cierre: {{ datePipe.transform(value.data.finish_date) }}</span>
            </div>
            <div
              class='col-12 col-md-3 col-lg-2 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0'>
              <button nbButton status='info' fullWidth class='mb-2' (click)='VerDetalle(value.data)'>Ver detalles
              </button>
              <a style="text-decoration: none" nbButton status='primary' fullWidth
              (click)="ConfirmInscription(dialog,value.data)">Inscríbete</a>
            </div>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card style="min-width: 360px; max-width: 450px">
        <nb-card-header>Confirmacíon de Inscripción</nb-card-header>
        <nb-card-body>Usted desea inscribirse al Curso/Taller “ {{value.data.curso}} ”</nb-card-body>
        <nb-card-footer>
        <button nbButton fullWidth (click)="ref.close()" hero status="danger">Cancelar</button>
          <a style="text-decoration: none;margin-top:1em;" nbButton status='primary' fullWidth
[routerLink]="!user ? '/auth' : '/public/register/students'"
[queryParams]="{ register: 'students', course_id: value.data.id }">Inscríbete</a>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
})
export class CardProgramComponent implements ViewCell, OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public user = null;

  constructor(
    private dialogService: NbDialogService,
    private authService: AuthService,
    public datePipe: DateFormatPipe
  ) {
  }

  ngOnInit() {
    this.user = this.authService.GetUser();
  }

  VerDetalle(course) {
    this.dialogService.open(DetailCourseComponent, {
      context: {
        course,
        user: this.user,
        datePipe: this.datePipe
      },
    });
  }

  ConfirmInscription(dialog: TemplateRef<any>,course) {
    this.dialogService.open(dialog, { context: 
      course,
        });
  }
}