import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  public product_category: ProductCategory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductCategory[]> {
    let servObj = new ServiceObject(params ? 'product_category?pagination=false' : 'product_category');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_category = <ProductCategory[]>servObj.data.product_category;

        return Promise.resolve(this.product_category);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProductCategoryByGroup(product_group_id): Promise<ProductCategory[]> {
    let servObj = new ServiceObject('productCategory/byGroup',product_group_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_category = <ProductCategory[]>servObj.data.product_category;
        return Promise.resolve(this.product_category);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_category');
    servObj.data = product_category;
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

  Update(product_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_category', product_category.id);
    servObj.data = product_category;
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
    let servObj = new ServiceObject('product_category', id);
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
