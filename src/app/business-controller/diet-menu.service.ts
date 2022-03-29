import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietMenu } from '../models/diet-menu';

@Injectable({
  providedIn: 'root'
})
export class DietMenuService {
  public diet_menu: DietMenu[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietMenu[]> {
    // let servObj = new ServiceObject('diet_menu');
    let servObj = new ServiceObject(params ? 'diet_menu?pagination=false' : 'diet_menu');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_menu = <DietMenu[]>servObj.data.diet_menu;

        return Promise.resolve(this.diet_menu);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_menu: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu');
    servObj.data = diet_menu;
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

  Update(diet_menu: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu', diet_menu.id);
    servObj.data = diet_menu;
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
    let servObj = new ServiceObject('diet_menu', id);
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
