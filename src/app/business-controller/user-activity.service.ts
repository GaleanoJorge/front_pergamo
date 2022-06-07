import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserActivity } from '../models/user-activity';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  public user_activity: UserActivity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<UserActivity[]> {
    let servObj = new ServiceObject(params ? 'user_activity?pagination=false' : 'user_activity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.user_activity = <UserActivity[]>servObj.data.user_activity;

        return Promise.resolve(this.user_activity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(user_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_activity');
    servObj.data = user_activity;
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

  Update(user_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_activity', user_activity.id);
    servObj.data = user_activity;
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
    let servObj = new ServiceObject('user_activity', id);
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
