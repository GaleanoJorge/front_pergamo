import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedAccessories } from '../models/fixed-accessories';

@Injectable({
  providedIn: 'root'
})
export class FixedAccessoriesService {
  public fixed_accessories: FixedAccessories[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedAccessories[]> {
    let servObj = new ServiceObject(params ? 'fixed_accessories?pagination=false' : 'fixed_accessories');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_accessories = <FixedAccessories[]>servObj.data.fixed_accessories;

        return Promise.resolve(this.fixed_accessories);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_accessories: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_accessories');
    servObj.data = fixed_accessories;
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

  Update(fixed_accessories: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_accessories', fixed_accessories.id);
    servObj.data = fixed_accessories;
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
    let servObj = new ServiceObject('fixed_accessories', id);
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
