import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyStock } from '../models/pharmacy_stock';

@Injectable({
  providedIn: 'root'
})
export class PharmacyStockService {
  public pharmacy_stock: PharmacyStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyStock[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_stock?pagination=false' : 'pharmacy_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_stock = <PharmacyStock[]>servObj.data.pharmacy_stock;

        return Promise.resolve(this.pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_stock');
    servObj.data = pharmacy_stock;
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

  Update(pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_stock', pharmacy_stock.id);
    servObj.data = pharmacy_stock;
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
    let servObj = new ServiceObject('pharmacy_stock', id);
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
