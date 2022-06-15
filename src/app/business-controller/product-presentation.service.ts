import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProductPresentation } from '../models/product-presentation';

@Injectable({
  providedIn: 'root'
})
export class ProductPresentationService {
  public product_presentation: ProductPresentation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProductPresentation[]> {
    let servObj = new ServiceObject(params ? 'product_presentation?pagination=false' : 'product_presentation');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.product_presentation = <ProductPresentation[]>servObj.data.product_presentation;

        return Promise.resolve(this.product_presentation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(product_presentation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_presentation');
    servObj.data = product_presentation;
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

  Update(product_presentation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('product_presentation', product_presentation.id);
    servObj.data = product_presentation;
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
    let servObj = new ServiceObject('product_presentation', id);
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
