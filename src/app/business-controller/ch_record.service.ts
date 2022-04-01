import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRecord } from '../models/ch-record';

@Injectable({
  providedIn: 'root'
})
export class ChRecordService {
  public ch_record: ChRecord[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRecord[]> {
    let servObj = new ServiceObject(params ? 'ch_record?pagination=false' : 'ch_record');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_record = <ChRecord[]>servObj.data.ch_record;

        return Promise.resolve(this.ch_record);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_record: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record');
    servObj.data = ch_record;
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

  Update(ch_record: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record', ch_record.id);
    servObj.data = ch_record;
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
    let servObj = new ServiceObject('ch_record', id);
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