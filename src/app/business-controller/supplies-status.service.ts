import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SuppliesStatus } from '../models/supplies-status';

@Injectable({
  providedIn: 'root'
})
export class SuppliesStatusService {
  public supplies_status: SuppliesStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SuppliesStatus[]> {
    let servObj = new ServiceObject(params ? 'supplies_status?pagination=false' : 'supplies_status');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.supplies_status = <SuppliesStatus[]>servObj.data.supplies_status;

        return Promise.resolve(this.supplies_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(supplies_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('supplies_status');
    servObj.data = supplies_status;
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


  Update(supplies_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('supplies_status', supplies_status.id);
    servObj.data = supplies_status;
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
    let servObj = new ServiceObject('supplies_status', id);
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
