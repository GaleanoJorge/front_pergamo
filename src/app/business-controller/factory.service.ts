import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Factory } from '../models/factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  public factory: Factory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Factory[]> {
    let servObj = new ServiceObject(params ? 'factory?pagination=false' : 'factory');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.factory = <Factory[]>servObj.data.factory;

        return Promise.resolve(this.factory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(factory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('factory');
    servObj.data = factory;
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

  Update(factory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('factory', factory.id);
    servObj.data = factory;
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
    let servObj = new ServiceObject('factory', id);
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
