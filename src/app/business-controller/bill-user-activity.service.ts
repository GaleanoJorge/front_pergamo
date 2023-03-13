import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillUserActivity } from '../models/bill-user-activity';

@Injectable({
  providedIn: 'root'
})
export class BillUserActivityService {
  public bill_user_activity: BillUserActivity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillUserActivity[]> {
    let servObj = new ServiceObject(params ? 'bill_user_activity?pagination=false' : 'bill_user_activity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bill_user_activity = <BillUserActivity[]>servObj.data.bill_user_activity;

        return Promise.resolve(this.bill_user_activity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(bill_user_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bill_user_activity');
    servObj.data = bill_user_activity;
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

  Update(bill_user_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bill_user_activity', bill_user_activity.id);
    servObj.data = bill_user_activity;
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

  Recalculate(bill_user_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bill_user_activity/RecalculateTariff', bill_user_activity.id);
    servObj.data = bill_user_activity;
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
    let servObj = new ServiceObject('bill_user_activity', id);
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
