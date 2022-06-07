import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NomProduct } from '../models/nom-product';

@Injectable({
  providedIn: 'root'
})
export class NomProductService {
  public nom_product: NomProduct[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NomProduct[]> {
    let servObj = new ServiceObject(params ? 'nom_product?pagination=false' : 'nom_product');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.nom_product = <NomProduct[]>servObj.data.nom_product;

        return Promise.resolve(this.nom_product);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProductSubcategoryByCategory(product_subcategory_id): Promise<NomProduct[]> {
    let servObj = new ServiceObject('NomProduct/byCategory',product_subcategory_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.nom_product = <NomProduct[]>servObj.data.nom_product;
        return Promise.resolve(this.nom_product);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(nom_product: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nom_product');
    servObj.data = nom_product;
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

  Update(nom_product: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nom_product', nom_product.id);
    servObj.data = nom_product;
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
    let servObj = new ServiceObject('nom_product', id);
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
