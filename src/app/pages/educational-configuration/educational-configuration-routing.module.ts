import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationalConfigurationComponent } from './educational-configuration.component';
import { OriginComponent } from './origin/origin.component';
import { AreaComponent } from './area/area.component';
import { SubareaComponent } from './subarea/subarea.component';
import { ThemesComponent } from './themes/themes.component';
import { CompetitionComponent } from './competition/competition.component';
import { ValidityComponent } from './validity/validity.component';
import { EntityTypeComponent } from './entity-type/entity-type.component';
import { SpecialtymComponent } from './specialtym/specialtym.component';
import { CreateOriginComponent } from './origin/create-origin/create-origin.component';
import { EditOriginComponent } from './origin/edit-origin/edit-origin.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseListComponent } from '../course/course-list/course-list.component';

const routes: Routes = [{
  path: '',
  component: EducationalConfigurationComponent,
  children: [
    {
      path: 'origin',
      component: OriginComponent,
    },
    {
      path: 'origin/create',
      component: CreateOriginComponent,
    },
    {
      path: 'origin/:id/edit',
      component: EditOriginComponent,
    },
    {
      path: 'origin/:origin_id/category/create',
      component: CreateCategoryComponent,
    },
    {
      path: 'category/create',
      component: CreateCategoryComponent,
    },
    {
      path: 'category/edit/:id',
      component: EditCategoryComponent,
    },
    {
      path: 'origin/:origin_id/category/:id/edit',
      component: EditCategoryComponent,
    },
    {
      path: 'area',
      component: AreaComponent,
    },
    {
      path: 'subarea',
      component: SubareaComponent,
    },
    {
      path: 'themes',
      component: ThemesComponent,
    },
    {
      path: 'competition',
      component: CompetitionComponent,
    },
    {
      path: 'validity',
      component: ValidityComponent,
    },
    {
      path: 'entity',
      component: EntityTypeComponent,
    },
    {
      path: 'specialtym',
      component: SpecialtymComponent,
    },
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'subcategory',
      component: SubCategoryComponent,
    },
    {
      path: 'list/:id',
      component: CourseListComponent,
    },
    {
      path: 'course-type',
      component: CourseTypeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationalConfigurationRoutingModule {
}
