import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietTherapeuticComponent } from '../models/diet-therapeutic-component';

@Injectable({
  providedIn: 'root'
})
export class DietTherapeuticComponentService {
  public diet_therapeutic_component: DietTherapeuticComponent[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietTherapeuticComponent[]> {
    let servObj = new ServiceObject(params ? 'diet_therapeutic_component?pagination=false' : 'diet_therapeutic_component');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_therapeutic_component = <DietTherapeuticComponent[]>servObj.data.diet_therapeutic_component;

        return Promise.resolve(this.diet_therapeutic_component);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_therapeutic_component: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_therapeutic_component');
    servObj.data = diet_therapeutic_component;
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

  Update(diet_therapeutic_component: any, id=null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_therapeutic_component', diet_therapeutic_component.id? diet_therapeutic_component.id : id);
    servObj.data = diet_therapeutic_component;
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
    let servObj = new ServiceObject('diet_therapeutic_component', id);
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
