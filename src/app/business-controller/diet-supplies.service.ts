import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietSupplies } from '../models/diet-supplies';

@Injectable({
  providedIn: 'root'
})
export class DietSuppliesService {
  public diet_supplies: DietSupplies[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietSupplies[]> {
    let servObj = new ServiceObject(params ? 'diet_supplies?pagination=false' : 'diet_supplies');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_supplies = <DietSupplies[]>servObj.data.diet_supplies;

        return Promise.resolve(this.diet_supplies);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies');
    servObj.data = diet_supplies;
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

  Update(diet_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies', diet_supplies.id);
    servObj.data = diet_supplies;
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
    let servObj = new ServiceObject('diet_supplies', id);
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
