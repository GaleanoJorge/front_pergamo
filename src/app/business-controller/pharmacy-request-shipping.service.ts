import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyRequestShipping } from '../models/pharmacy-request-shipping';

@Injectable({
  providedIn: 'root'
})
export class PharmacyRequestShippingService {
  public pharmacy_request_shipping: PharmacyRequestShipping[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyRequestShipping[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_request_shipping?pagination=false' : 'pharmacy_request_shipping');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_request_shipping = <PharmacyRequestShipping[]>servObj.data.pharmacy_request_shipping;

        return Promise.resolve(this.pharmacy_request_shipping);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_request_shipping: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_request_shipping');
    servObj.data = pharmacy_request_shipping;
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

  Update(pharmacy_request_shipping: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_request_shipping', id );
    servObj.data = pharmacy_request_shipping;
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
    let servObj = new ServiceObject('pharmacy_request_shipping', id);
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
