import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { GroupActivityBusinessService } from './group-activity-business.service';
import { DeliveryBusinessService } from './delivery-business.service';

@Injectable({
  providedIn: 'root'
})
export class ActiviyBusinessService {

  public activities: Activity[] = [];

  constructor(private webAPI: WebAPIService, private deliveryBS: DeliveryBusinessService) { }

  GetCollection(id: number): Promise<Activity[]> {
    var servObj = new ServiceObject("activity/allBySession", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.activities = <Activity[]>servObj.data.activities;
        this.activities.forEach(element => {
          element.deliveries = [];
          this.deliveryBS.GetCollection(element.id).then(x => {
            element.deliveries = x;
          }).catch(x => {
            throw x.message;
          });
        });
        return Promise.resolve(this.activities);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
