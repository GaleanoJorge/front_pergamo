import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, "MMM/dd/yyyy, HH:mm:ss");
  }

  getMonth(value: any, args?: any): any {
    var fecha = new Date(value);
    return fecha.getMonth()+1;
  }

  getCurrentMonth(value: any, args?: any): any {
    var fecha = new Date();
    return fecha.getMonth()+1;
  }

  getMonthPretty(value: any, args?: any): any {
    return super.transform(value, "MMM");
  }

  transform2(value: any, args?: any): any {
    return super.transform(value, "yyyy-MM-dd");
  }

  transform3(value: any, args?: any): any {
    return super.transform(value, "dd-MM-yyyy");
  }

  transform4(value: any, args?: any): any {
    return super.transform(value, "yyyy-MM-dd, HH:mm:ss");
  }

  convertoToAMPM(value: any, args?: any): any {
    return super.transform("1/1/1 " + value, "h:mm a");
  }

  convertoToAMPM2(value: any, args?: any): any {
    var date = new Date(value);
    return super.transform(value, "HH:mm");
    // return date.getHours() + ":" + date.getMinutes();
  }

}
