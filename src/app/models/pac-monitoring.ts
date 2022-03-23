import { Time } from '@angular/common';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DetailsViewSettingsModel } from '@syncfusion/ej2-filemanager';
import { MainClass } from './main-class';

export class PacMonitoring {
    id: number;
    admission_id: number;
    application_date: Date;
    authorization_pin: String;
    profesional_user_id: number;
    diagnosis_id: number;
    reception_hour: Time;
    presentation_hour: Time;
    acceptance_hour: Time;
    offer_hour: Time;
    start_consult_hour: Time;
    finish_consult_hour: Time;
    close_date: Date;
    close_crm_hour: Time;
    copay_value:number;
}
