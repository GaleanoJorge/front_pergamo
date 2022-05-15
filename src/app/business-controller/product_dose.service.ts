import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductDose } from '../models/product-dose';

@Injectable({
  providedIn: 'root'
})
export class ProductDoseService {
  public product_dose: ProductDose[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductDose[]> {
    let servObj = new ServiceObject(params ? 'product_dose?pagination=false' : 'product_dose');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_dose = <ProductDose[]>servObj.data.product_dose;

        return Promise.resolve(this.product_dose);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_dose: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_dose');
    servObj.data = product_dose;
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

  Update(product_dose: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_dose', product_dose.id);
    servObj.data = product_dose;
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
    let servObj = new ServiceObject('product_dose', id);
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
