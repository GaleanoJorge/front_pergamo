import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietMenuType } from '../models/diet-menu-type';

@Injectable({
  providedIn: 'root'
})
export class DietMenuTypeService {
  public diet_menu_type: DietMenuType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietMenuType[]> {
    let servObj = new ServiceObject(params ? 'diet_menu_type?pagination=false' : 'diet_menu_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_menu_type = <DietMenuType[]>servObj.data.diet_menu_type;

        return Promise.resolve(this.diet_menu_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_menu_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu_type');
    servObj.data = diet_menu_type;
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

  Update(diet_menu_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu_type', diet_menu_type.id);
    servObj.data = diet_menu_type;
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
    let servObj = new ServiceObject('diet_menu_type', id);
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
