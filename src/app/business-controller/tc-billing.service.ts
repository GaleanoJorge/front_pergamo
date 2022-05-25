import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcBilling } from '../models/tc-biling';


@Injectable({
  providedIn: 'root'
})
export class TcBillingService {
  public billing_tc: TcBilling[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(billing_tc = {}): Promise<TcBilling[]> {
    let servObj = new ServiceObject(billing_tc ? 'billing_tc?pagination=false' : 'billing_tc');

    return this.webAPI.GetAction(servObj, billing_tc)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_tc = <TcBilling[]>servObj.data.billing_tc;

        return Promise.resolve(this.billing_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_tc');
    servObj.data = billing_tc;
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

  Update(billing_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_tc', billing_tc.id);
    servObj.data = billing_tc;
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
    let servObj = new ServiceObject('billing_tc', id);
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

  SaveFile(billing_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_tc/file');
    servObj.data = billing_tc;
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

}

