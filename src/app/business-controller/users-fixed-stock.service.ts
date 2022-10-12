import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UsersFixedStock } from '../models/users-fixed-stock';

@Injectable({
  providedIn: 'root'
})
export class UsersFixedStockService {
  public users_fixed_stock: UsersFixedStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<UsersFixedStock[]> {
    let servObj = new ServiceObject(params ? 'users_fixed_stock?pagination=false' : 'users_fixed_stock');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users_fixed_stock = <UsersFixedStock[]>servObj.data.users_fixed_stock;

        return Promise.resolve(this.users_fixed_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(users_fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('users_fixed_stock');
    servObj.data = users_fixed_stock;
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

  Update(users_fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('users_fixed_stock', users_fixed_stock.id);
    servObj.data = users_fixed_stock;
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
    let servObj = new ServiceObject('users_fixed_stock', id);
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



  getFixedUserId(id, params = {}): Promise<UsersFixedStock[]> {
    let servObj = new ServiceObject('users_fixed_stock/byuser/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users_fixed_stock = <UsersFixedStock[]>servObj.data.users_fixed_stock;

        return Promise.resolve(this.users_fixed_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }


}
