import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwHousingAspect } from '../models/ch-sw-housing-aspect';

@Injectable({
  providedIn: 'root'
})
export class ChSwHousingAspectService {
  public ch_sw_housing_aspect: ChSwHousingAspect[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwHousingAspect[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_housing_aspect?pagination=false' : 'ch_sw_housing_aspect');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_housing_aspect = <ChSwHousingAspect[]>servObj.data.ch_sw_housing_aspect;

        return Promise.resolve(this.ch_sw_housing_aspect);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_housing_aspect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing_aspect');
    servObj.data = ch_sw_housing_aspect;
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

  Update(ch_sw_housing_aspect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing_aspect', ch_sw_housing_aspect.id);
    servObj.data = ch_sw_housing_aspect;
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
    let servObj = new ServiceObject('ch_sw_housing_aspect', id);
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
