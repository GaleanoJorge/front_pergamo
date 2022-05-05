import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SourceRetention } from '../models/source-retention';

@Injectable({
  providedIn: 'root'
})
export class SourceRetentionService {
  public source_retention: SourceRetention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SourceRetention[]> {
    let servObj = new ServiceObject(params ? 'source_retention?pagination=false' : 'source_retention');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.source_retention = <SourceRetention[]>servObj.data.source_retention;

        return Promise.resolve(this.source_retention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(source_retention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('source_retention');
    servObj.data = source_retention;
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

  Update(source_retention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('source_retention', source_retention.id);
    servObj.data = source_retention;
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
    let servObj = new ServiceObject('source_retention', id);
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
