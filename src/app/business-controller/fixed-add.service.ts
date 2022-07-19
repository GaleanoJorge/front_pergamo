import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedAdd } from '../models/fixed-add';

@Injectable({
  providedIn: 'root'
})
export class FixedAddService {
  public fixed_add: FixedAdd[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedAdd[]> {
    let servObj = new ServiceObject(params ? 'fixed_add?pagination=false' : 'fixed_add');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_add = <FixedAdd[]>servObj.data.fixed_add;

        return Promise.resolve(this.fixed_add);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_add: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_add');
    servObj.data = fixed_add;
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

  Update(fixed_add: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_add', fixed_add.id);
    servObj.data = fixed_add;
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

  updateInventoryByLot(fixed_add: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_add/updateInventoryByLot', fixed_add.id);
    servObj.data = fixed_add;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_add', id);
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


  GetPharmacyByUserId(id, params = {}): Promise<FixedAdd[]> {
    let servObj = new ServiceObject('fixed_add/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_add = <FixedAdd[]>servObj.data.fixed_add;

        return Promise.resolve(this.fixed_add);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
