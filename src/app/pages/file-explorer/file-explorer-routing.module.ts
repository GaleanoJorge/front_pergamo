import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileExplorerComponent } from './file-explorer.component';
import { FileExplorerIntComponent } from './file-explorer-int/file-explorer-int.component';

const routes: Routes = [{
  path: '',
  component: FileExplorerComponent,
  children: [
    {
      path: 'file-explorer-int',
      component: FileExplorerIntComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileExplorerRoutingModule {
}
