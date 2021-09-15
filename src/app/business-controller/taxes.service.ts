import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Taxes } from '../models/taxes';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  public taxes: Taxes[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Taxes[]> {
    let servObj = new ServiceObject(params ? 'taxes?pagination=false' : 'taxes');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.taxes = <Taxes[]>servObj.data.taxes;

        return Promise.resolve(this.taxes);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(taxes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('taxes');
    servObj.data = taxes;
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

  Update(taxes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('taxes', taxes.id);
    servObj.data = taxes;
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
    let servObj = new ServiceObject('taxes', id);
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
