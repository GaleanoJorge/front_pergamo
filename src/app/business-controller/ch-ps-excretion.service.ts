import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsExcretion } from '../models/ch-ps-exam-excretion';

@Injectable({
  providedIn: 'root'
})
export class ChPsExcretionService {
  public ch_ps_excretion: ChPsExcretion[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsExcretion[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_excretion?pagination=false' : 'ch_ps_excretion');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_excretion = <ChPsExcretion[]>servObj.data.ch_ps_excretion;

        return Promise.resolve(this.ch_ps_excretion);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_excretion: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_excretion');
    servObj.data = ch_ps_excretion;
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

  Update(ch_ps_excretion: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_excretion', ch_ps_excretion.id);
    servObj.data = ch_ps_excretion;
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
    let servObj = new ServiceObject('ch_ps_excretion', id);
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
