import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsConsciousness } from '../models/ch-ps-consciousness';


@Injectable({
  providedIn: 'root'
})
export class ChPsConsciousnessService {
  public ch_ps_consciousness: ChPsConsciousness[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsConsciousness[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_consciousness?pagination=false' : 'ch_ps_consciousness');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_consciousness = <ChPsConsciousness[]>servObj.data.ch_ps_consciousness;

        return Promise.resolve(this.ch_ps_consciousness);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_consciousness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_consciousness');
    servObj.data = ch_ps_consciousness;
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

  Update(ch_ps_consciousness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_consciousness', ch_ps_consciousness.id);
    servObj.data = ch_ps_consciousness;
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
    let servObj = new ServiceObject('ch_ps_consciousness', id);
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
