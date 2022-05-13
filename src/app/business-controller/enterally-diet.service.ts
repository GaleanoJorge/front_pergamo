import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { EnterallyDiet } from '../models/enterally-diet';

@Injectable({
  providedIn: 'root'
})
export class EnterallyDietService {
  public enterally_diet: EnterallyDiet[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<EnterallyDiet[]> {
    let servObj = new ServiceObject(params ? 'enterally_diet?pagination=false' : 'enterally_diet');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.enterally_diet = <EnterallyDiet[]>servObj.data.enterally_diet;

        return Promise.resolve(this.enterally_diet);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(enterally_diet: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('enterally_diet');
    servObj.data = enterally_diet;
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

  Update(enterally_diet: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('enterally_diet', enterally_diet.id);
    servObj.data = enterally_diet;
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
    let servObj = new ServiceObject('enterally_diet', id);
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
