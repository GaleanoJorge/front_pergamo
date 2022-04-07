import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { StatusBill } from '../models/status-bill';

@Injectable({
  providedIn: 'root'
})
export class StatusBillService {
  public status_bill: StatusBill[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<StatusBill[]> {
    let servObj = new ServiceObject(params ? 'status_bill?pagination=false' : 'status_bill');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.status_bill = <StatusBill[]>servObj.data.status_bill;

        return Promise.resolve(this.status_bill);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(status_bill: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('status_bill');
    servObj.data = status_bill;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(status_bill: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('status_bill', status_bill.id);
    servObj.data = status_bill;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
 
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('status_bill', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
