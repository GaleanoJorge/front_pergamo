import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FiscalClasification } from '../models/fiscal-clasification';

@Injectable({
  providedIn: 'root'
})
export class FiscalClasificationService {
  public fiscal_clasification: FiscalClasification[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FiscalClasification[]> {
    let servObj = new ServiceObject(params ? 'fiscal_clasification?pagination=false' : 'fiscal_clasification');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fiscal_clasification = <FiscalClasification[]>servObj.data.fiscal_clasification;

        return Promise.resolve(this.fiscal_clasification);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fiscal_clasification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fiscal_clasification');
    servObj.data = fiscal_clasification;
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

  Update(fiscal_clasification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fiscal_clasification', fiscal_clasification.id);
    servObj.data = fiscal_clasification;
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
    let servObj = new ServiceObject('fiscal_clasification', id);
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
