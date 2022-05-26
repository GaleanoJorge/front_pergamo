import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedClasification } from '../models/fixed-clasification';

@Injectable({
  providedIn: 'root'
})
export class FixedClasificationService {
  public fixed_clasification: FixedClasification[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedClasification[]> {
    let servObj = new ServiceObject(params ? 'fixed_clasification?pagination=false' : 'fixed_clasification');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_clasification = <FixedClasification[]>servObj.data.fixed_clasification;

        return Promise.resolve(this.fixed_clasification);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_clasification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_clasification');
    servObj.data = fixed_clasification;
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

  Update(fixed_clasification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_clasification', fixed_clasification.id);
    servObj.data = fixed_clasification;
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
    let servObj = new ServiceObject('fixed_clasification', id);
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
