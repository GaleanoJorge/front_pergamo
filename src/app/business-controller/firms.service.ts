import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Firms } from '../models/firms';

@Injectable({
  providedIn: 'root'
})
export class FirmsService {
  public firms: Firms[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Firms[]> {
    let servObj = new ServiceObject(params ? 'firms?pagination=false' : 'firms');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.firms = <Firms[]>servObj.data.firms;

        return Promise.resolve(this.firms);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(firms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('firms');
    servObj.data = firms;
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

  Update(firms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('firms', firms.id);
    servObj.data = firms;
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
    let servObj = new ServiceObject('firms', id);
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
