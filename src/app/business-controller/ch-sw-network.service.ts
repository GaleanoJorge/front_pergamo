import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwNetwork } from '../models/ch-sw-network';
@Injectable({
  providedIn: 'root'
})
export class ChSwNetworkService {
  public ch_sw_network: ChSwNetwork[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwNetwork[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_network?pagination=false' : 'ch_sw_network');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_network = <ChSwNetwork[]>servObj.data.ch_sw_network;

        return Promise.resolve(this.ch_sw_network);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_network: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_network');
    servObj.data = ch_sw_network;
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

  Update(ch_sw_network: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_network', ch_sw_network.id);
    servObj.data = ch_sw_network;
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
    let servObj = new ServiceObject('ch_sw_network', id);
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
