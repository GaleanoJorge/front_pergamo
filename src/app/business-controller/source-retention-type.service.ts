import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SourceRetentionType } from '../models/source-retention-type';

@Injectable({
  providedIn: 'root'
})
export class SourceRetentionTypeService {
  public source_retention_type: SourceRetentionType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SourceRetentionType[]> {
    let servObj = new ServiceObject(params ? 'source_retention_type?pagination=false' : 'source_retention_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.source_retention_type = <SourceRetentionType[]>servObj.data.source_retention_type;

        return Promise.resolve(this.source_retention_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(source_retention_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('source_retention_type');
    servObj.data = source_retention_type;
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

  Update(source_retention_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('source_retention_type', source_retention_type.id);
    servObj.data = source_retention_type;
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
    let servObj = new ServiceObject('source_retention_type', id);
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
