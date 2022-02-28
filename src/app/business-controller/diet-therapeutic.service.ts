import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietTherapeutic } from '../models/diet-therapeutic';

@Injectable({
  providedIn: 'root'
})
export class DietTherapeuticService {
  public diet_therapeutic: DietTherapeutic[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietTherapeutic[]> {
    let servObj = new ServiceObject(params ? 'diet_therapeutic?pagination=false' : 'diet_therapeutic');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_therapeutic = <DietTherapeutic[]>servObj.data.diet_therapeutic;

        return Promise.resolve(this.diet_therapeutic);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_therapeutic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_therapeutic');
    servObj.data = diet_therapeutic;
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

  Update(diet_therapeutic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_therapeutic', diet_therapeutic.id);
    servObj.data = diet_therapeutic;
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
    let servObj = new ServiceObject('diet_therapeutic', id);
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
