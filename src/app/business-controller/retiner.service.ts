import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Retiner } from '../models/retiner';

@Injectable({
  providedIn: 'root'
})
export class RetinerService {
  public retiner: Retiner[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Retiner[]> {
    let servObj = new ServiceObject(params ? 'retiner?pagination=false' : 'retiner');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.retiner = <Retiner[]>servObj.data.retiner;

        return Promise.resolve(this.retiner);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(retiner: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('retiner');
    servObj.data = retiner;
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

  Update(retiner: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('retiner', retiner.id);
    servObj.data = Retiner;
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
    let servObj = new ServiceObject('retiner', id);
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
