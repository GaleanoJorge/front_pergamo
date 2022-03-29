import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConsumptionUnit } from '../models/consumption-unit';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionUnitService {
  public consumption_unit: ConsumptionUnit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ConsumptionUnit[]> {
    let servObj = new ServiceObject(params ? 'consumption_unit?pagination=false' : 'consumption_unit');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.consumption_unit = <ConsumptionUnit[]>servObj.data.consumption_unit;

        return Promise.resolve(this.consumption_unit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(consumption_unit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('consumption_unit');
    servObj.data = consumption_unit;
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

  Update(consumption_unit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('consumption_unit', consumption_unit.id);
    servObj.data = consumption_unit;
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
    let servObj = new ServiceObject('consumption_unit', id);
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
