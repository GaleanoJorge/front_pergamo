import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbAlertModule,
  NbWindowModule,
  NbSelectModule,
  NbTooltipModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { DynamicCategoryComponent } from './dynamic-category/dynamic-category.component';
import { ModulesComponent } from './modules/modules.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ActivitiesComponent } from './activities/activities.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { PagesModule } from '../pages.module';
import { CourseInstitutionComponent } from './course-institution/course-institution.component';
import { EducationalInstitutionListComponent } from './educational-institution-list/educational-institution-list.component';
import { EducationalInstitutionSingleComponent } from './educational-institution-single/educational-institution-single.component';
import { GroupComponent } from './group/group.component';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

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
    NbSelectModule,
    CategoryRoutingModule,
    NbAlertModule,
    NbWindowModule.forChild(),
    PagesModule,
    NbTooltipModule
  ],
  declarations: [
    CategoryComponent,
    CategoriesComponent,
    CoursesComponent,
    DynamicCategoryComponent,
    ModulesComponent,
    SessionsComponent,
    ActivitiesComponent,
    DeliveriesComponent,
    CourseInstitutionComponent,
    EducationalInstitutionListComponent,
    EducationalInstitutionSingleComponent,
    GroupComponent
  ],
  providers: [
    DateFormatPipe
  ],
})
export class CategoryModule { }
