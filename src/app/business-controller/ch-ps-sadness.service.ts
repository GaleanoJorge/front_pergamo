import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSadness } from '../models/ch-ps-sadness';

@Injectable({
  providedIn: 'root'
})
export class ChPsSadnessService {
  public ch_ps_sadness: ChPsSadness[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSadness[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_sadness?pagination=false' : 'ch_ps_sadness');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_sadness = <ChPsSadness[]>servObj.data.ch_ps_sadness;

        return Promise.resolve(this.ch_ps_sadness);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_sadness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sadness');
    servObj.data = ch_ps_sadness;
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

  Update(ch_ps_sadness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sadness', ch_ps_sadness.id);
    servObj.data = ch_ps_sadness;
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
    let servObj = new ServiceObject('ch_ps_sadness', id);
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
