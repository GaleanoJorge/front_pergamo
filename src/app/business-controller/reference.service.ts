import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Reference } from '../models/reference';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  public reference: Reference[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Reference[]> {
    let servObj = new ServiceObject(params ? 'reference?pagination=false' : 'reference');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.reference = <Reference[]>servObj.data.reference;

        return Promise.resolve(this.reference);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getReferenceData(params = {}): Promise<Reference[]> {
    let servObj = new ServiceObject('reference/getReferenceData/' + 0);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.reference = <Reference[]>servObj.data.reference;

        return Promise.resolve(this.reference);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reference: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reference');
    servObj.data = reference;
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

  Update(reference: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reference', reference.id);
    servObj.data = reference;
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
    let servObj = new ServiceObject('reference', id);
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
