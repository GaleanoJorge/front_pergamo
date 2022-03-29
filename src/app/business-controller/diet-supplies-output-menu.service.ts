import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietSuppliesOutputMenu } from '../models/diet-supplies-output-menu';

@Injectable({
  providedIn: 'root'
})
export class DietSuppliesOutputMenuService {
  public diet_supplies_output_menu: DietSuppliesOutputMenu[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietSuppliesOutputMenu[]> {
    let servObj = new ServiceObject(params ? 'diet_supplies_output_menu?pagination=false' : 'diet_supplies_output_menu');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_supplies_output_menu = <DietSuppliesOutputMenu[]>servObj.data.diet_supplies_output_menu;

        return Promise.resolve(this.diet_supplies_output_menu);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_supplies_output_menu: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_output_menu');
    servObj.data = diet_supplies_output_menu;
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

  Update(diet_supplies_output_menu: any, id=null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_supplies_output_menu', diet_supplies_output_menu.id? diet_supplies_output_menu.id : id);
    servObj.data = diet_supplies_output_menu;
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
    let servObj = new ServiceObject('diet_supplies_output_menu', id);
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
