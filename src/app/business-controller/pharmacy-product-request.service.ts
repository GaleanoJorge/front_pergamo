import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyProductRequest } from '../models/pharmacy-product-request';

@Injectable({
  providedIn: 'root'
})
export class PharmacyProductRequestService {
  public pharmacy_product_request: PharmacyProductRequest[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyProductRequest[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_product_request?pagination=false' : 'pharmacy_product_request');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_product_request = <PharmacyProductRequest[]>servObj.data.pharmacy_product_request;

        return Promise.resolve(this.pharmacy_product_request);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_product_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_product_request');
    servObj.data = pharmacy_product_request;
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

  Update(pharmacy_product_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_product_request', pharmacy_product_request.id);
    servObj.data = pharmacy_product_request;
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

  updateInventoryByLot(pharmacy_product_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_product_request/updateInventoryByLot', pharmacy_product_request.id);
    servObj.data = pharmacy_product_request;
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
    let servObj = new ServiceObject('pharmacy_product_request', id);
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


  GetPharmacyByUserId(id, params = {}): Promise<PharmacyProductRequest[]> {
    let servObj = new ServiceObject('pharmacy_lot_stock/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_product_request = <PharmacyProductRequest[]>servObj.data.pharmacy_lot_stock;

        return Promise.resolve(this.pharmacy_product_request);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
