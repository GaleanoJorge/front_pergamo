import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NbAuthComponent} from '@nebular/auth';
import {LoginComponent} from './pages/login/login.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';


export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LoginComponent,
      },
      {
        path: 'login/:id',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      }
     
    ],
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule),
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth'},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
