import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsParaphasias } from '../models/ch-ps-paraphasias';

@Injectable({
  providedIn: 'root'
})
export class ChPsParaphasiasService {
  public ch_ps_paraphasias: ChPsParaphasias[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsParaphasias[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_paraphasias?pagination=false' : 'ch_ps_paraphasias');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_paraphasias = <ChPsParaphasias[]>servObj.data.ch_ps_paraphasias;

        return Promise.resolve(this.ch_ps_paraphasias);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_paraphasias: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_paraphasias');
    servObj.data = ch_ps_paraphasias;
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

  Update(ch_ps_paraphasias: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_paraphasias', ch_ps_paraphasias.id);
    servObj.data = ch_ps_paraphasias;
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
    let servObj = new ServiceObject('ch_ps_paraphasias', id);
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
