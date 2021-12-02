import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Flat } from '../models/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  public flat: Flat[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Flat[]> {
    let servObj = new ServiceObject(params ? 'flat?pagination=false' : 'flat');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.flat = <Flat[]>servObj.data.flat;

        return Promise.resolve(this.flat);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetFlatByCampus(campus_id): Promise<Flat[]> {
    let servObj = new ServiceObject('flat/byCampus',campus_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.flat = <Flat[]>servObj.data.flat;
        return Promise.resolve(this.flat);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(flat: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('flat');
    servObj.data = flat;
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

  Update(flat: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('flat', flat.id);
    servObj.data = flat;
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
    let servObj = new ServiceObject('flat', id);
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
