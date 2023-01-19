import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConsentsInformed } from '../models/consents-informed';

@Injectable({
  providedIn: 'root'
})
export class ConsentsInformedService {
  public consents_informed: ConsentsInformed[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ConsentsInformed[]> {
    let servObj = new ServiceObject(params ? 'consents_informed?pagination=false' : 'consents_informed');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.consents_informed = <ConsentsInformed[]>servObj.data.consents_informed;

        return Promise.resolve(this.consents_informed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewCI(admission_id: any, params: any={}): any {
    let servObj = new ServiceObject('viewCI/'+ admission_id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(consents_informed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('consents_informed');
    servObj.data = consents_informed;
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

  Update(consents_informed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('consents_informed', consents_informed.id);
    servObj.data = consents_informed;
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
    let servObj = new ServiceObject('consents_informed', id);
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
