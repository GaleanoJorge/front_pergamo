import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedProperty } from '../models/fixed-property';

@Injectable({
  providedIn: 'root'
})
export class FixedPropertyService {
  public fixed_property: FixedProperty[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedProperty[]> {
    let servObj = new ServiceObject(params ? 'fixed_property?pagination=false' : 'fixed_property');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_property = <FixedProperty[]>servObj.data.fixed_property;

        return Promise.resolve(this.fixed_property);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_property: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_property');
    servObj.data = fixed_property;
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

  Update(fixed_property: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_property', fixed_property.id);
    servObj.data = fixed_property;
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
    let servObj = new ServiceObject('fixed_property', id);
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
