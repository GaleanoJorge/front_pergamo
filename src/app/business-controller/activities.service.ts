import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { Activities } from '../models/activities';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  public activities: Activities[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Activities[]> {
    let servObj = new ServiceObject(params ? 'activities?pagination=false' : 'activities');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.activities = <Activities[]>servObj.data.activities;

        return Promise.resolve(this.activities);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(activities: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('activities');
    servObj.data = activities;
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

  Update(activities: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('activities', activities.id);
    servObj.data = activities;
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
    let servObj = new ServiceObject('activities', id);
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
