import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChMedicalOrders } from '../models/ch-medical-orders';

@Injectable({
  providedIn: 'root'
})
export class ChMedicalOrdersService {
  public ch_medical_orders: ChMedicalOrders[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChMedicalOrders[]> {
    let servObj = new ServiceObject(params ? 'ch_medical_orders?pagination=false' : 'ch_medical_orders');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_medical_orders = <ChMedicalOrders[]>servObj.data.ch_medical_orders;

        return Promise.resolve(this.ch_medical_orders);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_medical_orders: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_medical_orders');
    servObj.data = ch_medical_orders;
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

  Update(ch_medical_orders: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_medical_orders', ch_medical_orders.id);
    servObj.data = ch_medical_orders;
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
    let servObj = new ServiceObject('ch_medical_orders', id);
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
