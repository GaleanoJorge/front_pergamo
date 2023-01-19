import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductSupplies } from '../models/product-supplies';

@Injectable({
  providedIn: 'root'
})
export class ProductSuppliesService {
  public product_supplies: ProductSupplies[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductSupplies[]> {
    let servObj = new ServiceObject(params ? 'product_supplies?pagination=false' : 'product_supplies');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_supplies = <ProductSupplies[]>servObj.data.product_supplies;

        return Promise.resolve(this.product_supplies);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_supplies');
    servObj.data = product_supplies;
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

  Update(product_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_supplies', product_supplies.id);
    servObj.data = product_supplies;
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
    let servObj = new ServiceObject('product_supplies', id);
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
