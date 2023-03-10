/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbChatModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
  NbButtonModule,
  NbAlertModule,
  NbRadioModule,
  NbIconModule,
  NbAutocompleteModule,
} from '@nebular/theme';
import { LoginComponent } from './pages/login/login.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { PagesModule } from './pages/pages.module';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LoginComponent, DateFormatPipe,],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbButtonModule,
    NbAutocompleteModule,
    NbInputModule,
    NbAlertModule,
    NbAutocompleteModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
    NbRadioModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    DateFormatPipe,
    CurrencyPipe,
    PercentPipe
  ],
  exports: [
    PagesModule,
    DateFormatPipe,
    CurrencyPipe,
    NbEvaIconsModule,
  ],
})
export class AppModule {
}
