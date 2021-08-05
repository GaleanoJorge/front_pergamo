import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton [nbPopover]="templateRef">
        <nb-icon icon="info-outline"></nb-icon>
      </button>      
    </div>
    <ng-template #templateRef>
      <nb-card [nbSpinner]="!status" nbSpinnerStatus="basic">
        <nb-card-header>Información</nb-card-header>
        <nb-card-body *ngIf="course">
        Nombre: {{value.data.course}}<br>
        Sede: {{value.data.campus}}<br>
        Inicio: {{pipe.transform(course.start_date)}}<br>
        Fin: {{pipe.transform(course.finish_date)}}<br>
        Capacidad: {{course.quota}}<br>
        </nb-card-body>
      </nb-card>
    </ng-template>
  `,
})
export class InfoComponentCourses implements ViewCell, OnInit {

  public status: boolean;
  public course: any;

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(public courseBS: CourseBusinessService, public pipe: DateFormatPipe) { }

  ngOnInit() {
    this.courseBS.GetById(this.value.data.course_id).then(x => {
      this.course = x;
      this.status = true;
    }).catch(x => { });
  }
}
