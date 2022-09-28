import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsAwareness } from '../models/ch-ps-awareness';

@Injectable({
  providedIn: 'root'
})
export class ChPsAwarenessService {
  public ch_ps_awareness: ChPsAwareness[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAwareness[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_awareness?pagination=false' : 'ch_ps_awareness');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_awareness = <ChPsAwareness[]>servObj.data.ch_ps_awareness;

        return Promise.resolve(this.ch_ps_awareness);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_awareness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_awareness');
    servObj.data = ch_ps_awareness;
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

  Update(ch_ps_awareness: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_awareness', ch_ps_awareness.id);
    servObj.data = ch_ps_awareness;
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
    let servObj = new ServiceObject('ch_ps_awareness', id);
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
