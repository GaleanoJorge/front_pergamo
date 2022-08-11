import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwHousing } from '../models/ch-sw-housing';

@Injectable({
  providedIn: 'root'
})
export class ChSwHousingService {
  public ch_sw_housing: ChSwHousing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwHousing[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_housing?pagination=false' : 'ch_sw_housing');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_housing = <ChSwHousing[]>servObj.data.ch_sw_housing;

        return Promise.resolve(this.ch_sw_housing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_housing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing');
    servObj.data = ch_sw_housing;
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

  Update(ch_sw_housing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_housing', ch_sw_housing.id);
    servObj.data = ch_sw_housing;
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
    let servObj = new ServiceObject('ch_sw_housing', id);
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
