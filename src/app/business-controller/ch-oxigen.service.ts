import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChOxigen } from '../models/ch-oxigen'; 

@Injectable({
  providedIn: 'root'
})
export class ChOxigenService {
  public ch_oxigen: ChOxigen[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChOxigen[]> {
    let servObj = new ServiceObject(params ? 'ch_oxigen?pagination=false' : 'ch_oxigen');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_oxigen = <ChOxigen[]>servObj.data.ch_oxigen;

        return Promise.resolve(this.ch_oxigen);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record, type): Promise<ChOxigen[]> {
    let servObj = new ServiceObject('ch_oxigen/by_record/' + record + '/' + type + '?pagination=false');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_oxigen = <ChOxigen[]>servObj.data.ch_oxigen;

        return Promise.resolve(this.ch_oxigen);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_oxigen: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_oxigen');
    servObj.data = ch_oxigen;
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

  Update(ch_oxigen: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_oxigen', ch_oxigen.id);
    servObj.data = ch_oxigen;
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
    let servObj = new ServiceObject('ch_oxigen', id);
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
