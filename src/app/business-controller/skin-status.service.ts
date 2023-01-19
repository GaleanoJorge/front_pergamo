import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SkinStatus } from '../models/skin-status';

@Injectable({
  providedIn: 'root'
})
export class SkinStatusService {
  public skin_status: SkinStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SkinStatus[]> {
    let servObj = new ServiceObject(params ? 'skin_status?pagination=false' : 'skin_status');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.skin_status = <SkinStatus[]>servObj.data.skin_status;

        return Promise.resolve(this.skin_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(skin_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('skin_status');
    servObj.data = skin_status;
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

  Update(skin_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('skin_status', skin_status.id);
    servObj.data = skin_status;
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
    let servObj = new ServiceObject('skin_status', id);
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
