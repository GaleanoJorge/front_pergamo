import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsComponent} from './students/students.component';
import {InscriptionsComponent} from './inscriptions.component';
import {RouterModule} from '@angular/router';
import {InscriptionsRoutingModule} from './inscriptions-routing.module';
import {DetailCourseComponent} from './detail-course.component';
import {PagesModule} from '../../pages/pages.module';
import {NbButtonModule, NbCardModule, NbListModule, NbSpinnerModule} from '@nebular/theme';

@NgModule({
  declarations: [StudentsComponent, InscriptionsComponent, DetailCourseComponent],
    imports: [
        CommonModule,
        RouterModule,
        InscriptionsRoutingModule,
        PagesModule,
        NbCardModule,
        NbListModule,
        NbSpinnerModule,
        NbButtonModule,
    ],
})
export class InscriptionsModule {
}
