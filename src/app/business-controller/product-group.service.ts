import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductGroup } from '../models/product-group';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  public product_group: ProductGroup[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductGroup[]> {
    let servObj = new ServiceObject(params ? 'product_group?pagination=false' : 'product_group');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_group = <ProductGroup[]>servObj.data.product_group;

        return Promise.resolve(this.product_group);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_group');
    servObj.data = product_group;
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

  Update(product_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_group', product_group.id);
    servObj.data = product_group;
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
    let servObj = new ServiceObject('product_group', id);
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
