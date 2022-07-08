import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductGeneric } from '../models/product-generic';

@Injectable({
  providedIn: 'root'
})
export class ProductGenericService {
  public product_generic: ProductGeneric[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductGeneric[]> {
    let servObj = new ServiceObject(params ? 'product_generic?pagination=false' : 'product_generic');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_generic = <ProductGeneric[]>servObj.data.product_generic;

        return Promise.resolve(this.product_generic);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_generic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_generic');
    servObj.data = product_generic;
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

  Update(product_generic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_generic', product_generic.id);
    servObj.data = product_generic;
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
    let servObj = new ServiceObject('product_generic', id);
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
