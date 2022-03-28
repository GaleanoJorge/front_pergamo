import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Retentions } from '../models/retentions';

@Injectable({
  providedIn: 'root'
})
export class RetentionsService {
  public retentions: Retentions[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Retentions[]> {
    let servObj = new ServiceObject(params ? 'retentions?pagination=false' : 'retentions');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.retentions = <Retentions[]>servObj.data.retentions;

        return Promise.resolve(this.retentions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(retentions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('retentions');
    servObj.data = retentions;
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

  Update(retentions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('retentions', retentions.id);
    servObj.data = retentions;
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
    let servObj = new ServiceObject('retentions', id);
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
