import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductSubcategory } from '../models/product-subcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductSubcategoryService {
  public product_subcategory: ProductSubcategory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductSubcategory[]> {
    let servObj = new ServiceObject(params ? 'product_subcategory?pagination=false' : 'product_subcategory');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_subcategory = <ProductSubcategory[]>servObj.data.product_subcategory;

        return Promise.resolve(this.product_subcategory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProductSubcategoryByCategory(product_category_id): Promise<ProductSubcategory[]> {
    let servObj = new ServiceObject('productSubcategory/byCategory',product_category_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_subcategory = <ProductSubcategory[]>servObj.data.product_subcategory;
        return Promise.resolve(this.product_subcategory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_subcategory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_subcategory');
    servObj.data = product_subcategory;
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

  Update(product_subcategory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_subcategory', product_subcategory.id);
    servObj.data = product_subcategory;
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
    let servObj = new ServiceObject('product_subcategory', id);
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
