import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbInputModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FileExplorerRoutingModule } from './file-explorer-routing.module';
import { FileExplorerComponent } from './file-explorer.component';
import { FileExplorerIntComponent } from './file-explorer-int/file-explorer-int.component';

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
    FileExplorerRoutingModule,
    NbInputModule,
    FileManagerAllModule
  ],
  declarations: [
    FileExplorerComponent,
    FileExplorerIntComponent,
  ],
  providers: [],
})
export class FileExplorerModule { }
