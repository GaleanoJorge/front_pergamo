import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SpecialField } from '../models/special-field';

@Injectable({
  providedIn: 'root'
})
export class SpecialFieldService {
  public special_field: SpecialField[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SpecialField[]> {
    let servObj = new ServiceObject(params ? 'special-field?pagination=false' : 'special-field');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.special_field = <SpecialField[]>servObj.data.special_field;

        return Promise.resolve(this.special_field);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(cost_center: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('special_field');
    servObj.data = cost_center;
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

  Update(special_field: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('special_field', special_field.id);
    servObj.data = special_field;
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
    let servObj = new ServiceObject('special_field', id);
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
