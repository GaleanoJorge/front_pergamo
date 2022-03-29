import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserChange } from '../models/user-change';

@Injectable({
  providedIn: 'root'
})
export class UserChangeService {
  public user_change: UserChange[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<UserChange[]> {
    let servObj = new ServiceObject(params ? 'user_change?pagination=false' : 'user_change');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.user_change = <UserChange[]>servObj.data.user_change;

        return Promise.resolve(this.user_change);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(user_change: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_change');
    servObj.data = user_change;
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

  Update(user_change: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_change', user_change.id);
    servObj.data = user_change;
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
    let servObj = new ServiceObject('user_change', id);
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
