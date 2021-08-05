import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PollConfigurationComponent} from './poll-configuration.component';
import {FormEditScalesComponent} from './scales/form-edit-scales/form-edit-scales.component';
import {ScalesComponent} from './scales/scales.component';
import {SectionsComponent} from './sections/sections.component';
import {CreateScalesComponent} from './scales/create-scales/create-scales.component';
import {CreateSectionComponent} from './sections/create-section/create-section.component';
import {EditSectionComponent} from './sections/edit-section/edit-section.component';
import {CreateQuestionComponent} from './question/create-question/create-question.component';
import {EditQuestionComponent} from './question/edit-question/edit-question.component';

const routes: Routes = [{
  path: '',
  component: PollConfigurationComponent,
  children: [
    {
      path: 'sections',
      component: SectionsComponent,
    },
    {
      path: 'sections/create',
      component: CreateSectionComponent,
    },
    {
      path: 'sections/:id/edit',
      component: EditSectionComponent,
    },
    {
      path: 'scales',
      component: ScalesComponent,
    },
    {
      path: 'scales/create',
      component: CreateScalesComponent,
    },
    {
      path: 'scales/:id/edit',
      component: FormEditScalesComponent,
    },
    {
      path: 'sections/:section_id/questions/create',
      component: CreateQuestionComponent,
    },
    {
      path: 'sections/:section_id/questions/:id/edit',
      component: EditQuestionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollConfigurationRoutingModule {
}
