import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { ActiviyBusinessService } from './activiy-business.service';

@Injectable({
  providedIn: 'root',
})
export class SessionBusinessService {

  public sessions: Session[] = [];

  constructor(private webAPI: WebAPIService, private activityBS: ActiviyBusinessService) {
  }

  GetCollection(id: number): Promise<Session[]> {
    var servObj = new ServiceObject("session/allByModule", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.sessions = <Session[]>servObj.data.sessions;
        this.sessions.forEach(element => {
          element.activities = [];
          this.activityBS.GetCollection(element.id).then(x => {
            element.activities = x;
          }).catch(x => {
            throw x.message;
          });
        });
        return Promise.resolve(this.sessions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetSingle(id: number): Promise<Session[]> {
    var servObj = new ServiceObject("session", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.sessions = <Session[]>servObj.data.session;
        return Promise.resolve(this.sessions);
      })
      .catch(x => {
        throw x.message;
      });
  }


  Save(session) {
    let servObj = new ServiceObject('session');
    servObj.data = session;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        return x.message;
      });
  }

  Update(session) {
    let servObj = new ServiceObject('session', session.id);
    servObj.data = session;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        return x.message;
      });
  }

  Delete(session_id): Promise<any> {
    let servObj = new ServiceObject('session', session_id);
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

  CreateRoom(session_id) {
    let servObj = new ServiceObject('createRoomSession', session_id);
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        return x.message;
      });
  }

  CreateQR(data): Promise<any> {
    var ids = data.session_id + "/" + data.urg_id;
    var servObj = new ServiceObject("session/CreateQRCode/" + ids);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.session);
      })
      .catch(x => {
        throw x.message;
      });
  }


  GetQRData(data): Promise<any> {
    var ids = data.session_id + "/" + data.urg_id;
    var servObj = new ServiceObject("public/sessionQRCode/" + ids);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.session);
      })
      .catch(x => {
        throw x.error.message;
      });
  }
}
