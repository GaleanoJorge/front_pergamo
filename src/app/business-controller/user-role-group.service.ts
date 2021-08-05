import { Validity } from '../models/validity';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { UserRoleGroup } from '../models/user-role-group';
import { User } from '../@core/data/users';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGroupService {

  public userRoleGroup: UserRoleGroup[];

  constructor(private webAPI: WebAPIService) { }

  GetByGroup(id: number): Promise<UserRoleGroup[]> {
    let servObj = new ServiceObject('userRoleByGroup', id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.userRoleGroup = <UserRoleGroup[]>servObj.data.user_role_group;
        return Promise.resolve(this.userRoleGroup);
      })
      .catch(x => {
        throw x.message;
      });
  }


}
