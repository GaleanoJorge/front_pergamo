import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PriceType } from '../models/price-type';

@Injectable({
  providedIn: 'root'
})
export class PriceTypeService {
  public price_type: PriceType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PriceType[]> {
    let servObj = new ServiceObject(params ? 'price_type?pagination=false' : 'price_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.price_type = <PriceType[]>servObj.data.price_type;

        return Promise.resolve(this.price_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(price_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('price_type');
    servObj.data = price_type;
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

  Update(price_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('price_type', price_type.id);
    servObj.data = price_type;
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
    let servObj = new ServiceObject('price_type', id);
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
