import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRtSessions } from '../models/ch-rt-sessions';

@Injectable({
  providedIn: 'root'
})
export class ChRtSessionsService {
  public ch_rt_sessions:ChRtSessions[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRtSessions[]> {
    let servObj = new ServiceObject(params ? 'ch_rt_sessions?pagination=false' : 'ch_rt_sessions');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_rt_sessions = <ChRtSessions[]>servObj.data.ch_rt_sessions;

        return Promise.resolve(this.ch_rt_sessions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_rt_sessions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rt_sessions');
    servObj.data = ch_rt_sessions;
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

  Update(ch_rt_sessions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rt_sessions', ch_rt_sessions.id);
    servObj.data = ch_rt_sessions;
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
    let servObj = new ServiceObject('ch_rt_sessions', id);
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
