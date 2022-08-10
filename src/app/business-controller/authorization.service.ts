import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Authorization } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public authorization: Authorization[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Authorization[]> {
    let servObj = new ServiceObject(params ? 'authorization?pagination=false' : 'authorization');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.authorization = <Authorization[]>servObj.data.authorization;

        return Promise.resolve(this.authorization);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetInProcess(params = {}): Promise<Authorization[]> {
    let servObj = new ServiceObject(params ? 'authorization/byStatus/0?pagination=false' : 'authorization/byStatus/0');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.authorization = <Authorization[]>servObj.data.authorization;

        return Promise.resolve(this.authorization);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(authorization: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('authorization');
    servObj.data = authorization;
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

  SaveGroup(authorization: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('authorization/Massive');
    servObj.data = authorization;
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

  Update(authorization: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('authorization', authorization.id);
    servObj.data = authorization;
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
    let servObj = new ServiceObject('authorization', id);
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
