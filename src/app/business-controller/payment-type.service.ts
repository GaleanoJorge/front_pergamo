import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PaymentType } from '../models/payment-type';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  public payment_type: PaymentType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PaymentType[]> {
    let servObj = new ServiceObject(params ? 'payment_type?pagination=false' : 'payment_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.payment_type = <PaymentType[]>servObj.data.payment_type;

        return Promise.resolve(this.payment_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(payment_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('payment_type');
    servObj.data = payment_type;
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

  Update(payment_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('payment_type', payment_type.id);
    servObj.data = payment_type;
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
    let servObj = new ServiceObject('payment_type', id);
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
