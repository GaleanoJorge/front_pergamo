import { Component, Input, OnInit } from '@angular/core';
import { ModuleBusinessService } from '../../business-controller/module-business.service';
import { Module } from '../../models/module';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth.service';

@Component({
  template: `
    <nb-card style="min-width: 360px; max-width: 450px">
      <nb-card-header>
        Detalle del curso: {{ course.curso }}
      </nb-card-header>
      <nb-card-body [nbSpinner]="loading" nbSpinnerStatus="primary">
      <div class="row">
      <div class='col-12 d-flex flex-column'>
        <span class='lead mb-2 font-weight-bold' style="font-size: 1em">{{ course.programa }}</span>
        <span class='lead mb-1' style="font-size: 1em">Sede: {{ course.sede }}</span>
        <span class='lead mb-1 font-weight-light'
              style='font-size: .8em'>Fecha Inicio: {{ datePipe.transform(course.start_date) }}</span>
        <span class='lead font-weight-light'
              style='font-size: .8em'>Fecha Cierre: {{ datePipe.transform(course.finish_date) }}</span>
        <a style="text-decoration: none" class="mt-2" nbButton status='primary' fullWidth
           [routerLink]="!user ? '/auth' : '/public/register/students'"
           [queryParams]="{ register: 'students',  course_id: course.id }">
           Inscríbete
        </a>
      </div>
    </div>

        <div class="row mt-4">
          <div class="col-12">
            <nb-list>
              <nb-list-item *ngIf="!loading && !modules.length">
                <p class="lead">No se han encontrado resultados</p>
              </nb-list-item>
              <nb-list-item *ngFor="let module of modules" class="d-flex flex-column align-items-start">
                <p>{{ module.name }}</p>
                <p class="caption">{{ module.description }}</p>
              </nb-list-item>
            </nb-list>
          </div>
        </div>

      </nb-card-body>
    </nb-card>
  `,
})
export class DetailCourseComponent implements OnInit {
  @Input() course: Course = null;
  @Input() datePipe: any;
  @Input() user = null;

  public modules: Module[] = [];
  public loading: boolean = true;

  constructor(
    private moduleBS: ModuleBusinessService,
  ) {
  }

  ngOnInit(): void {

    this.moduleBS.GetPublicByCourse(this.course.id).then(x => {
      this.modules = x;
      this.loading = false;
    }).catch(x => {
      this.loading = false;
    });
  }

}