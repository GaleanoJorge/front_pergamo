import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypePharmacyStock } from '../models/type_pharmacy_stock';

@Injectable({
  providedIn: 'root'
})
export class TypePharmacyStockService {
  public type_pharmacy_stock: TypePharmacyStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypePharmacyStock[]> {
    let servObj = new ServiceObject(params ? 'type_pharmacy_stock?pagination=false' : 'type_pharmacy_stock');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_pharmacy_stock = <TypePharmacyStock[]>servObj.data.type_pharmacy_stock;

        return Promise.resolve(this.type_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_pharmacy_stock');
    servObj.data = type_pharmacy_stock;
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

  Update(type_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_pharmacy_stock', type_pharmacy_stock.id);
    servObj.data = type_pharmacy_stock;
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
    let servObj = new ServiceObject('type_pharmacy_stock', id);
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
