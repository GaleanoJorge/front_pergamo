import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductConcentration } from '../models/product-concentration';

@Injectable({
  providedIn: 'root'
})
export class ProductConcentrationService {
  public product_concentration: ProductConcentration[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductConcentration[]> {
    let servObj = new ServiceObject(params ? 'product_concentration?pagination=false' : 'product_concentration');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_concentration = <ProductConcentration[]>servObj.data.product_concentration;

        return Promise.resolve(this.product_concentration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_concentration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_concentration');
    servObj.data = product_concentration;
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

  Update(product_concentration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_concentration', product_concentration.id);
    servObj.data = product_concentration;
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
    let servObj = new ServiceObject('product_concentration', id);
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
