import { Time } from '@angular/common';
import { SingleSeries } from '@swimlane/ngx-charts';
import { MainClass } from './main-class';

export class ProductSupplies extends MainClass {
  size:string;
  measure:string;
  stature:string;
  minimum_stock: number;
  maximum_stock: number;
  description:string;
}