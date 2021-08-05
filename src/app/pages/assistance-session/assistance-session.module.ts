import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssistanceSessionRoutingModule } from './assistance-session-routing.module';
import { PagesModule } from '../pages.module';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule, NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AssistanceSessionComponent } from './assistance-session.component';
import { AssistanceSessionMainComponent } from './assistance-session-main/assistance-session-main.component';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

@NgModule({
  declarations: [
    AssistanceSessionComponent,
    AssistanceSessionMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AssistanceSessionRoutingModule,
    PagesModule,
    NbCardModule,
    NbButtonModule,
    NbBadgeModule,
    NbInputModule,
    NbCheckboxModule,
    FormsModule,
    NbIconModule,
    // NbDatepickerModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
  ],
  providers: [
    DateFormatPipe,
  ],
})
export class AssistanceSessionModule {
}
