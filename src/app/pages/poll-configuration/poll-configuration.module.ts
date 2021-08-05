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
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbDialogModule,
  NbIconModule,
  NbToggleModule,
  NbLayoutModule, NbSpinnerModule,
} from '@nebular/theme';
import {PollConfigurationComponent} from './poll-configuration.component';
import {ScalesComponent} from './scales/scales.component';
import {SectionsComponent} from './sections/sections.component';
import {ThemeModule} from '../../@theme/theme.module';
import {PollConfigurationRoutingModule} from './poll-configuration-routing.module';
import {PagesModule} from '../pages.module';
import {FormSectionComponent} from './sections/form-section/form-section.component';
import {FormScalesComponent} from './scales/form-scales/form-scales.component';
import {ActionsScalesComponent} from './scales/actionsScales.component';
import {FormEditScalesComponent} from './scales/form-edit-scales/form-edit-scales.component';
import {ActionsSectionComponent} from './sections/actionsSection.component';
import {ActionsOrderComponent} from './sections/actionsOrder.component';
import {CreateScalesComponent} from './scales/create-scales/create-scales.component';
import {ScalesItemsComponent} from './scales-items/scales-items.component';
import {FormScalesItemsComponent} from './scales-items/form-scales-items/form-scales-items.component';
import {ActionsScalesItemsComponent} from './scales-items/actionsScalesItems.component';
import {ActionsOrderScalesItemsComponent} from './scales-items/actionsOrderScalesItems.component';
import {CreateSectionComponent} from './sections/create-section/create-section.component';
import {EditSectionComponent} from './sections/edit-section/edit-section.component';
import {QuestionComponent} from './question/question.component';
import {ActionsQuestionSectionComponent} from './question/actionsQuestionsSection.component';
import {FormQuestionComponent} from './question/form-question/form-question.component';
import {CreateQuestionComponent} from './question/create-question/create-question.component';
import {EditQuestionComponent} from './question/edit-question/edit-question.component';
import {AnswerComponent} from './answer/answer.component';
import {FormAnswerComponent} from './answer/form-answer/form-answer.component';

@NgModule({
  declarations: [
    PollConfigurationComponent,
    ScalesComponent,
    SectionsComponent,
    FormSectionComponent,
    FormScalesComponent,
    ActionsScalesComponent,
    ActionsSectionComponent,
    FormEditScalesComponent,
    ActionsQuestionSectionComponent,
    ActionsOrderComponent,
    CreateScalesComponent,
    ScalesItemsComponent,
    FormScalesItemsComponent,
    ActionsScalesItemsComponent,
    ActionsOrderScalesItemsComponent,
    CreateSectionComponent,
    EditSectionComponent,
    QuestionComponent,
    FormQuestionComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    AnswerComponent,
    FormAnswerComponent,
  ],
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
    NbInputModule,
    NbToggleModule,
    NbSelectModule,
    NbAccordionModule,
    NbLayoutModule,
    NbUserModule,
    NbAlertModule,
    PollConfigurationRoutingModule,
    PagesModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbSpinnerModule,
  ],
})
export class PollConfigurationModule {
}
