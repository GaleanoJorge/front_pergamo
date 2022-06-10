import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductSuppliesCom } from '../models/product-supplies-com';

@Injectable({
  providedIn: 'root'
})
export class ProductSuppliesComService {
  public product_supplies_com: ProductSuppliesCom[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductSuppliesCom[]> {
    let servObj = new ServiceObject(params ? 'product_supplies_com?pagination=false' : 'product_supplies_com');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_supplies_com = <ProductSuppliesCom[]>servObj.data.product_supplies_com;

        return Promise.resolve(this.product_supplies_com);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_supplies_com: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_supplies_com');
    servObj.data = product_supplies_com;
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

  Update(product_supplies_com: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_supplies_com', product_supplies_com.id);
    servObj.data = product_supplies_com;
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
    let servObj = new ServiceObject('product_supplies_com', id);
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
