import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsAttention } from '../models/ch-ps-attention';

@Injectable({
  providedIn: 'root'
})
export class ChPsAttentionService {
  public ch_ps_attention: ChPsAttention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAttention[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_attention?pagination=false' : 'ch_ps_attention');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_attention = <ChPsAttention[]>servObj.data.ch_ps_attention;

        return Promise.resolve(this.ch_ps_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_attention');
    servObj.data = ch_ps_attention;
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

  Update(ch_ps_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_attention', ch_ps_attention.id);
    servObj.data = ch_ps_attention;
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
    let servObj = new ServiceObject('ch_ps_attention', id);
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
