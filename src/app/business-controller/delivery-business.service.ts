import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { GroupActivityBusinessService } from './group-activity-business.service';
import { ScoreBusinessService } from './score-business.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryBusinessService {

  public deliveries: Delivery[] = [];

  constructor(
    private webAPI: WebAPIService,
    private gropActivityBS: GroupActivityBusinessService,
    private scoreBS: ScoreBusinessService
  ) { }

  GetCollection(id: number): Promise<Delivery[]> {
    var servObj = new ServiceObject("delivery/allByActivity", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.deliveries = <Delivery[]>servObj.data.deliveries;
        this.deliveries.forEach(element => {
          element.groupActivities = [];
          element.scores = [];
          this.scoreBS.GetCollection(id).then(x => {
            element.scores = x;
          }).catch(x => {
            throw x.message;
          });
          if (element.user_group_activity_id)
            this.gropActivityBS.GetCollection(id).then(x => {
              element.groupActivities = x;
            }).catch(x => {
              throw x.message;
            });
        });
        return Promise.resolve(this.deliveries);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
