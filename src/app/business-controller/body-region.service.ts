import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BodyRegion } from '../models/body-region';

@Injectable({
  providedIn: 'root'
})
export class BodyRegionService {
  public body_region: BodyRegion[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BodyRegion[]> {
    let servObj = new ServiceObject(params ? 'body_region?pagination=false' : 'body_region');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.body_region = <BodyRegion[]>servObj.data.body_region;

        return Promise.resolve(this.body_region);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(body_region: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('body_region');
    servObj.data = body_region;
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

  Update(body_region: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('body_region', body_region.id);
    servObj.data = body_region;
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
    let servObj = new ServiceObject('body_region', id);
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
