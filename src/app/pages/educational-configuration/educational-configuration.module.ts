import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ActionsCategoryComponent } from './category/actions-category.component';
import { RouterModule } from '@angular/router';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbDialogModule,
  NbIconModule,
  NbToggleModule,
  NbLayoutModule, NbSpinnerModule,
  NbDatepickerModule,
} from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { EducationalConfigurationRoutingModule } from './educational-configuration-routing.module';
import { EducationalConfigurationComponent } from './educational-configuration.component';
import { PagesModule } from '../pages.module';
import { OriginComponent } from './origin/origin.component';
import { FormOriginComponent } from './origin/form-origin/form-origin.component';
import { AreaComponent } from './area/area.component';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import { FormAreaComponent } from './area/form-area/form-area.component';
import { SubareaComponent } from './subarea/subarea.component';
import { FormSubareaComponent } from './subarea/form-subarea/form-subarea.component';
import { ThemesComponent } from './themes/themes.component';
import { CompetitionComponent } from './competition/competition.component';
import { FormThemesComponent } from './themes/form-themes/form-themes.component';
import { FormCompetitionComponent } from './competition/form-competition/form-competition.component';
import { ValidityComponent } from './validity/validity.component';
import { FormValidityComponent } from './validity/form-validity/form-validity.component';
import { FormModuleComponent } from './module/form-module/form-module.component';
import { StatsApprovalComponent } from './category-approval/stats-approval.component';
import { FormCategoryApprovalComponent } from './category-approval/form-category-approval/form-category-approval.component';
import { EntityTypeComponent } from './entity-type/entity-type.component';
import { FormEntityTypeComponent } from './entity-type/form-entity-type/form-entity-type.component';
import { SpecialtymComponent } from './specialtym/specialtym.component';
import { FormSpecialtymComponent } from './specialtym/form-specialtym/form-specialtym.component';
import { ActionsOriginComponent } from './origin/actions-origin.component';
import { CreateOriginComponent } from './origin/create-origin/create-origin.component';
import { EditOriginComponent } from './origin/edit-origin/edit-origin.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './module/module.component';
import { CategoryApprovalComponent } from './category-approval/category-approval.component';
import { FormCourseComponent } from './course/form-course/form-course.component';
import { ActionsCategory2Component } from './category/actions-category2.component';
import { CourseTypeComponent } from './course-type/course-type.component';
import { FormCourseTypeComponent } from './course-type/course-type/form-course-type.component';

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
    NbDialogModule.forRoot(),
    NbListModule,
    RouterModule,
    NbInputModule,
    NbToggleModule,
    NbSelectModule,
    NbAccordionModule,
    NbLayoutModule,
    NbUserModule,
    NbAlertModule,
    EducationalConfigurationRoutingModule,
    PagesModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,

  ],
  declarations: [
    EducationalConfigurationComponent,
    OriginComponent,
    FormOriginComponent,
    AreaComponent,
    FormAreaComponent,
    SubareaComponent,
    StatsApprovalComponent,
    FormSubareaComponent,
    FormCategoryApprovalComponent,
    FormCompetitionComponent,
    ThemesComponent,
    CompetitionComponent,
    FormThemesComponent,
    ValidityComponent,
    FormValidityComponent,
    FormModuleComponent,
    EntityTypeComponent,
    SpecialtymComponent,
    FormEntityTypeComponent,
    FormSpecialtymComponent,
    ActionsOriginComponent,
    CreateOriginComponent,
    EditOriginComponent,
    CategoryComponent,
    SubCategoryComponent,
    FormCategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ActionsCategoryComponent,
    ActionsCategory2Component,
    CourseComponent,
    ModuleComponent,
    CategoryApprovalComponent,
    FormCourseComponent,
    CourseTypeComponent,
    FormCourseTypeComponent
  ],
  providers: [DateFormatPipe],
  
})
export class EducationalConfigurationModule {
}
