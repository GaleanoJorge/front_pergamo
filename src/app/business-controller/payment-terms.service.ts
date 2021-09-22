import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PaymentTerms } from '../models/payment-terms';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermsService {
  public payment_terms: PaymentTerms[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PaymentTerms[]> {
    let servObj = new ServiceObject(params ? 'payment_terms?pagination=false' : 'payment_terms');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.payment_terms = <PaymentTerms[]>servObj.data.PaymentTerms;

        return Promise.resolve(this.payment_terms);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(payment_terms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('payment_terms');
    servObj.data = payment_terms;
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

  Update(payment_terms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('payment_terms', payment_terms.id);
    servObj.data = PaymentTerms;
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
    let servObj = new ServiceObject('payment_terms', id);
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
