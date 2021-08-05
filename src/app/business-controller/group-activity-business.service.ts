import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { GroupActivity } from '../models/group_activity';

@Injectable({
  providedIn: 'root'
})
export class GroupActivityBusinessService {

  public groupActivities: GroupActivity[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(id: number): Promise<GroupActivity[]> {
    var servObj = new ServiceObject("groupActivity/allByActivity", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.groupActivities = <GroupActivity[]>servObj.data.groupActivities;
        return Promise.resolve(this.groupActivities);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
