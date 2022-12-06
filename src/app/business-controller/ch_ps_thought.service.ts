import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsThought } from '../models/ch-ps-thought';

@Injectable({
  providedIn: 'root'
})
export class ChPsThoughtService {
  public ch_ps_thought: ChPsThought[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsThought[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_thought?pagination=false' : 'ch_ps_thought');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_thought = <ChPsThought[]>servObj.data.ch_ps_thought;

        return Promise.resolve(this.ch_ps_thought);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_thought: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_thought');
    servObj.data = ch_ps_thought;
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

  Update(ch_ps_thought: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_thought', ch_ps_thought.id);
    servObj.data = ch_ps_thought;
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
    let servObj = new ServiceObject('ch_ps_thought', id);
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
