import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwConditionHousing } from '../models/ch-sw-condition-housing';

@Injectable({
  providedIn: 'root'
})
export class ChSwConditionHousingService {
  public ch_sw_condition_housing: ChSwConditionHousing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwConditionHousing[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_condition_housing?pagination=false' : 'ch_sw_condition_housing');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_condition_housing = <ChSwConditionHousing[]>servObj.data.ch_sw_condition_housing;

        return Promise.resolve(this.ch_sw_condition_housing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_condition_housing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_condition_housing');
    servObj.data = ch_sw_condition_housing;
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

  Update(ch_sw_condition_housing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_condition_housing', ch_sw_condition_housing.id);
    servObj.data = ch_sw_condition_housing;
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
    let servObj = new ServiceObject('ch_sw_condition_housing', id);
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
