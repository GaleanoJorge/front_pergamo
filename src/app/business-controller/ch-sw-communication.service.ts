import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwCommunications } from '../models/ch-sw-communication';

@Injectable({
  providedIn: 'root'
})
export class ChSwCommunicationsService {
  public ch_sw_communications: ChSwCommunications[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwCommunications[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_communications?pagination=false' : 'ch_sw_communications');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_communications = <ChSwCommunications[]>servObj.data.ch_sw_communications;

        return Promise.resolve(this.ch_sw_communications);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_communications: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_communications');
    servObj.data = ch_sw_communications;
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

  Update(ch_sw_communications: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_communications', ch_sw_communications.id);
    servObj.data = ch_sw_communications;
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
    let servObj = new ServiceObject('ch_sw_communications', id);
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
