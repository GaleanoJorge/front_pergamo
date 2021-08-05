import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssistanceSessionMainComponent } from './assistance-session-main/assistance-session-main.component';
import { AssistanceSessionComponent } from './assistance-session.component';

const routes: Routes = [{
  path: '',
  component: AssistanceSessionComponent,
  children: [
    {
      path: 'main/:id',
      component: AssistanceSessionMainComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceSessionRoutingModule {
}
