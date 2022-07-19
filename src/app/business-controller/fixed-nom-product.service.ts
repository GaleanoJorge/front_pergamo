import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { FixedNomProduct } from '../models/fixed-nom-product';

@Injectable({
  providedIn: 'root'
})
export class FixedNomProductService {
  public fixed_nom_product: FixedNomProduct[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedNomProduct[]> {
    let servObj = new ServiceObject(params ? 'fixed_nom_product?pagination=false' : 'fixed_nom_product');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_nom_product = <FixedNomProduct[]>servObj.data.fixed_nom_product;

        return Promise.resolve(this.fixed_nom_product);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProductSubcategoryByCategory(fixed_clasification_id): Promise<FixedNomProduct[]> {
    let servObj = new ServiceObject('FixedNomProduct/byCategory',fixed_clasification_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_nom_product = <FixedNomProduct[]>servObj.data.fixed_nom_product;
        return Promise.resolve(this.fixed_nom_product);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_nom_product: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_nom_product');
    servObj.data = fixed_nom_product;
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

  Update(fixed_nom_product: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_nom_product', fixed_nom_product.id);
    servObj.data = fixed_nom_product;
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
    let servObj = new ServiceObject('fixed_nom_product', id);
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
