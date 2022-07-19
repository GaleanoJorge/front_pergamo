import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingPad } from '../models/billing-pad';

@Injectable({
  providedIn: 'root'
})
export class BillingPadService {
  public billing_pad: BillingPad[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingPad[]> {
    let servObj = new ServiceObject(params ? 'billing_pad?pagination=false' : 'billing_pad');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_pad = <BillingPad[]>servObj.data.billing_pad;

        return Promise.resolve(this.billing_pad);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_pad: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad');
    servObj.data = billing_pad;
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

  NewBilling(billing_pad: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad/newBillingPad');
    servObj.data = billing_pad;
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

  GeneratePgpBilling(billing_pad: any, contract_id: number): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad/generatePgpBilling', contract_id);
    servObj.data = billing_pad;
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

  Update(billing_pad: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad', billing_pad.id);
    servObj.data = billing_pad;
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
    let servObj = new ServiceObject('billing_pad', id);
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

  GenerateFile(billing_pad: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad/generateBillingDat/'+billing_pad);
    servObj.data = billing_pad;
    return this.webAPI.GetAction(servObj)
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
