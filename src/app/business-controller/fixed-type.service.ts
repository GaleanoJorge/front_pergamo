import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedType } from '../models/fixed-type';

@Injectable({
  providedIn: 'root'
})
export class FixedTypeService {
  public fixed_type: FixedType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedType[]> {
    let servObj = new ServiceObject(params ? 'fixed_type?pagination=false' : 'fixed_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_type = <FixedType[]>servObj.data.fixed_type;

        return Promise.resolve(this.fixed_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_type');
    servObj.data = fixed_type;
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

  Update(fixed_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_type', fixed_type.id);
    servObj.data = fixed_type;
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
    let servObj = new ServiceObject('fixed_type', id);
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
