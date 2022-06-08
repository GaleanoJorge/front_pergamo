import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ManualPrice } from '../models/manual-price';

@Injectable({
  providedIn: 'root'
})
export class ManualPriceService {
  public manual_price: ManualPrice[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ManualPrice[]> {
    let servObj = new ServiceObject(params ? 'manual_price?pagination=false' : 'manual_price');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.manual_price = <ManualPrice[]>servObj.data.manual_price;

        return Promise.resolve(this.manual_price);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(manual_price: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('manual_price');
    servObj.data = manual_price;
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

  SaveFile(manual_price: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('fileUpload_manual_price', id);
    servObj.data = manual_price;
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

  Update(manual_price: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('manual_price', manual_price.id);
    servObj.data = manual_price;
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
    let servObj = new ServiceObject('manual_price', id);
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
