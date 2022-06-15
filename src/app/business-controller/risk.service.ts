import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Risk } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  public risk: Risk[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Risk[]> {
    let servObj = new ServiceObject(params ? 'risk?pagination=false' : 'risk');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.risk = <Risk[]>servObj.data.risk;

        return Promise.resolve(this.risk);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(risk: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('risk');
    servObj.data = risk;
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

  Update(risk: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('risk', risk.id);
    servObj.data = risk;
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
    let servObj = new ServiceObject('risk', id);
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
