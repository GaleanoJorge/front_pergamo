import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { StorageConditions } from '../models/storage-conditions';

@Injectable({
  providedIn: 'root'
})
export class StorageConditionsService {
  public storage_conditions: StorageConditions[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<StorageConditions[]> {
    let servObj = new ServiceObject(params ? 'storage_conditions?pagination=false' : 'storage_conditions');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.storage_conditions = <StorageConditions[]>servObj.data.storage_conditions;

        return Promise.resolve(this.storage_conditions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(storage_conditions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('storage_conditions');
    servObj.data = storage_conditions;
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

  Update(storage_conditions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('storage_conditions', storage_conditions.id);
    servObj.data = storage_conditions;
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
    let servObj = new ServiceObject('storage_conditions', id);
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
