import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MaritalStatus } from '../models/marital_status';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {
  public marital_status: MaritalStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MaritalStatus[]> {
    let servObj = new ServiceObject(params ? 'marital_status?pagination=false' : 'marital_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.marital_status = <MaritalStatus[]>servObj.data.marital_status;

        return Promise.resolve(this.marital_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(marital_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('marital_status');
    servObj.data = marital_status;
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

  Update(marital_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('marital_status', marital_status.id);
    servObj.data = marital_status;
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
    let servObj = new ServiceObject('marital_status', id);
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
