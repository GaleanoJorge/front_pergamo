import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserPharmacyStock } from '../models/user-pharmacy-stock';

@Injectable({
  providedIn: 'root'
})
export class UserPharmacyStockService {
  public user_pharmacy_stock: UserPharmacyStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<UserPharmacyStock[]> {
    let servObj = new ServiceObject(params ? 'user_pharmacy_stock?pagination=false' : 'user_pharmacy_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.user_pharmacy_stock = <UserPharmacyStock[]>servObj.data.user_pharmacy_stock;

        return Promise.resolve(this.user_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(user_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_pharmacy_stock');
    servObj.data = user_pharmacy_stock;
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

  Update(user_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_pharmacy_stock', user_pharmacy_stock.id);
    servObj.data = user_pharmacy_stock;
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

  updateInventoryByLot(user_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_pharmacy_stock/updateInventoryByLot', user_pharmacy_stock.id);
    servObj.data = user_pharmacy_stock;
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
    let servObj = new ServiceObject('user_pharmacy_stock', id);
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


  GetPharmacyByUserId(id, params = {}): Promise<UserPharmacyStock[]> {
    let servObj = new ServiceObject('fixed_assets/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.user_pharmacy_stock = <UserPharmacyStock[]>servObj.data.fixed_assets;

        return Promise.resolve(this.user_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
