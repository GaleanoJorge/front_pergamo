import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietSupplyType } from '../models/diet-supply-type';

@Injectable({
  providedIn: 'root'
})
export class DietSupplyTypeService {
  public diet_supply_type: DietSupplyType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietSupplyType[]> {
    let servObj = new ServiceObject(params ? 'diet_supply_type?pagination=false' : 'diet_supply_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_supply_type = <DietSupplyType[]>servObj.data.diet_supply_type;

        return Promise.resolve(this.diet_supply_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_supply_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supply_type');
    servObj.data = diet_supply_type;
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

  Update(diet_supply_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supply_type', diet_supply_type.id);
    servObj.data = diet_supply_type;
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
    let servObj = new ServiceObject('diet_supply_type', id);
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
