import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietSuppliesInput } from '../models/diet-supplies-input';

@Injectable({
  providedIn: 'root'
})
export class DietSuppliesInputService {
  public diet_supplies_input: DietSuppliesInput[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietSuppliesInput[]> {
    let servObj = new ServiceObject(params ? 'diet_supplies_input?pagination=false' : 'diet_supplies_input');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_supplies_input = <DietSuppliesInput[]>servObj.data.diet_supplies_input;

        return Promise.resolve(this.diet_supplies_input);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_supplies_input: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_input');
    servObj.data = diet_supplies_input;
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

  Update(diet_supplies_input: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_input', diet_supplies_input.id? diet_supplies_input.id: id);
    servObj.data = diet_supplies_input;
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
    let servObj = new ServiceObject('diet_supplies_input', id);
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
