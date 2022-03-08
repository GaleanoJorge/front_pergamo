import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietComponent } from '../models/diet-componet';

@Injectable({
  providedIn: 'root'
})
export class DietComponentService {
  public diet_component: DietComponent[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietComponent[]> {
    let servObj = new ServiceObject(params ? 'diet_component?pagination=false' : 'diet_component');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_component = <DietComponent[]>servObj.data.diet_component;

        return Promise.resolve(this.diet_component);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_component: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_component');
    servObj.data = diet_component;
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

  Update(diet_component: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_component', diet_component.id);
    servObj.data = diet_component;
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
    let servObj = new ServiceObject('diet_component', id);
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
