import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyRequestStock } from '../models/pharmacy-request-stock';

@Injectable({
  providedIn: 'root'
})
export class PharmacyRequestStockService {
  public pharmacy_request_stock: PharmacyRequestStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyRequestStock[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_request_stock?pagination=false' : 'pharmacy_request_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_request_stock = <PharmacyRequestStock[]>servObj.data.pharmacy_request_stock;

        return Promise.resolve(this.pharmacy_request_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_request_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_request_stock');
    servObj.data = pharmacy_request_stock;
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

  Update(pharmacy_request_stock: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_request_stock', id );
    servObj.data = pharmacy_request_stock;
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
    let servObj = new ServiceObject('pharmacy_request_stock', id);
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
