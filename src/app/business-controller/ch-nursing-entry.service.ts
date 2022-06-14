import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChNursingEntry } from '../models/ch-nursing-entry';

@Injectable({
  providedIn: 'root'
})
export class ChNursingEntryService {
  public ch_nursing_entry: ChNursingEntry[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNursingEntry[]> {
    let servObj = new ServiceObject(params ? 'ch_nursing_entry?pagination=false' : 'ch_nursing_entry');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nursing_entry = <ChNursingEntry[]>servObj.data.ch_nursing_entry;

        return Promise.resolve(this.ch_nursing_entry);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nursing_entry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_entry');
    servObj.data = ch_nursing_entry;
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

  Update(ch_nursing_entry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_entry', ch_nursing_entry.id);
    servObj.data = ch_nursing_entry;
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
    let servObj = new ServiceObject('ch_nursing_entry', id);
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
