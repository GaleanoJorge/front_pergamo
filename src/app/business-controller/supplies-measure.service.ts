import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SuppliesMeasure } from '../models/supplies-measure';

@Injectable({
  providedIn: 'root'
})
export class SuppliesMeasureService {
  public supplies_measure: SuppliesMeasure[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SuppliesMeasure[]> {
    let servObj = new ServiceObject(params ? 'supplies_measure?pagination=false' : 'supplies_measure');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.supplies_measure = <SuppliesMeasure[]>servObj.data.supplies_measure;

        return Promise.resolve(this.supplies_measure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProductSubcategoryByCategory(product_subcategory_id): Promise<SuppliesMeasure[]> {
    let servObj = new ServiceObject('SuppliesMeasure/byCategory',product_subcategory_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.supplies_measure = <SuppliesMeasure[]>servObj.data.supplies_measure;
        return Promise.resolve(this.supplies_measure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(supplies_measure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('supplies_measure');
    servObj.data = supplies_measure;
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

  Update(supplies_measure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('supplies_measure', supplies_measure.id);
    servObj.data = supplies_measure;
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
    let servObj = new ServiceObject('supplies_measure', id);
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
