import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietSuppliesOutput } from '../models/diet-supplies-output';

@Injectable({
  providedIn: 'root'
})
export class DietSuppliesOutputService {
  public diet_supplies_output: DietSuppliesOutput[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietSuppliesOutput[]> {
    let servObj = new ServiceObject(params ? 'diet_supplies_output?pagination=false' : 'diet_supplies_output');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_supplies_output = <DietSuppliesOutput[]>servObj.data.diet_supplies_output;

        return Promise.resolve(this.diet_supplies_output);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_supplies_output: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_output');
    servObj.data = diet_supplies_output;
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

  Update(diet_supplies_output: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_output', diet_supplies_output.id);
    servObj.data = diet_supplies_output;
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
    let servObj = new ServiceObject('diet_supplies_output', id);
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
