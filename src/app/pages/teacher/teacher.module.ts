import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule, NbUserModule, NbInputModule, NbIconModule, NbSpinnerModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {TeacherRoutingModule} from './teacher-routing.module';
import {TeacherComponent} from './teacher.component';
import {TeachersComponent} from './teachers/teachers.component';
import {PagesModule} from '../pages.module';
import {ActionsComponent} from './teachers/actions.component';
import { CreateTeacherComponent } from './teachers/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './teachers/edit-teacher/edit-teacher.component';
import { HistoryTeacherComponent } from './teachers/history-teacher/history-teacher.component';
import { MySesionComponent } from './my-sesion/my-sesion.component';
import { ActionsComponentSesion } from './my-sesion/actionssesion.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbStepperModule,
        NbCardModule,
        NbButtonModule,
        NbListModule,
        NbAccordionModule,
        NbUserModule,
        TeacherRoutingModule,
        NbInputModule,
        PagesModule,
        Ng2SmartTableModule,
        NbIconModule,
        NbSpinnerModule
    ],
  declarations: [
    TeacherComponent,
    TeachersComponent,
    ActionsComponent,
    CreateTeacherComponent,
    HistoryTeacherComponent,
    EditTeacherComponent,
    MySesionComponent,
    ActionsComponentSesion,
  ],
  providers: [],
})
export class TeacherModule {
}
