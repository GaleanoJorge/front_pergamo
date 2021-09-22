import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class Company extends MainClass {
  id: number;
  identification_type_id: number;
  identification: string;
  verification: number;
  name: string;
  company_categoty_id: number;
  company_type_id: number;
  administrator: string;
  country_id: number;
  city_id: number;
  address: string;
  phone: string;
  web: string;
  mail: string;
  repre_phone: string;
  repre_mail: string;
  representative: string;
  repre_identification: string;
  iva_id: number;
  retiner_id: number;
  company_kindperson_id: number;
  registration: number;
  opportunity: number;
  discount: number;
  payment_terms_id: number;
  
}
