import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseInstitutionComponent } from './course-institution/course-institution.component';
import { EducationalInstitutionListComponent } from './educational-institution-list/educational-institution-list.component';
import { EducationalInstitutionSingleComponent } from './educational-institution-single/educational-institution-single.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'categories',
      component: CategoriesComponent,
    },
    {
      path: 'courses/:id',
      component: CoursesComponent,
    },
    {
      path: 'course-institutions/:id/:idCategory',
      component: CourseInstitutionComponent,
    },
    {
      path: 'institutions/:idParent',
      component: EducationalInstitutionListComponent,
    },
    {
      path: 'institution-single/:idInstitution/:idParent',
      component: EducationalInstitutionSingleComponent,
    },
    {
      path: 'group/:group/:idCourse/:idInstitution/:idParent',
      component: GroupComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {
}
