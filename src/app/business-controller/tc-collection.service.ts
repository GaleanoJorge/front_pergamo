import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcCollection } from '../models/tc-collection';



@Injectable({
  providedIn: 'root'
})
export class TcCollectionService {
  public collection_tc: TcCollection[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcCollection[]> {
    let servObj = new ServiceObject(params ? 'collection_tc?pagination=false' : 'collection_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.collection_tc = <TcCollection[]>servObj.data.collection_tc;

        return Promise.resolve(this.collection_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(collection_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('collection_tc');
    servObj.data = collection_tc;
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

  Update(collection_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('collection_tc', collection_tc.id);
    servObj.data = collection_tc;
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
    let servObj = new ServiceObject('collection_tc', id);
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

  SaveFile(collection_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('collection_tc/file');
    servObj.data = collection_tc;
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
}
