import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwHousingType } from '../models/ch-sw-housing-type';

@Injectable({
  providedIn: 'root'
})
export class ChSwHousingTypeService {
  public ch_sw_housing_type: ChSwHousingType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwHousingType[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_housing_type?pagination=false' : 'ch_sw_housing_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_housing_type = <ChSwHousingType[]>servObj.data.ch_sw_housing_type;

        return Promise.resolve(this.ch_sw_housing_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_housing_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing_type');
    servObj.data = ch_sw_housing_type;
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

  Update(ch_sw_housing_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing_type', ch_sw_housing_type.id);
    servObj.data = ch_sw_housing_type;
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
    let servObj = new ServiceObject('ch_sw_housing_type', id);
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
