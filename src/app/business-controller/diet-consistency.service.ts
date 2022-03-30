import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietConsistency } from '../models/diet-consistency';

@Injectable({
  providedIn: 'root'
})
export class DietConsistencyService {
  public diet_consistency: DietConsistency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietConsistency[]> {
    let servObj = new ServiceObject(params ? 'diet_consistency?pagination=false' : 'diet_consistency');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_consistency = <DietConsistency[]>servObj.data.diet_consistency;

        return Promise.resolve(this.diet_consistency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_consistency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_consistency');
    servObj.data = diet_consistency;
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

  Update(diet_consistency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_consistency', diet_consistency.id);
    servObj.data = diet_consistency;
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
    let servObj = new ServiceObject('diet_consistency', id);
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
