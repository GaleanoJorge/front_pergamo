import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserCampus } from '../models/user-campus';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserCampusBusinessService {

  public users: User[] = [];
  public user: User;
  public Usercampus:UserCampus[]=[];

  constructor(
    private webAPI: WebAPIService,
    private router: Router,
  ) {
  }

  GetCollection($userId): Promise<UserCampus[]> {
    var servObj = new ServiceObject("campus/byUser", $userId);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.Usercampus = <UserCampus[]>servObj.data.campus;
        return Promise.resolve(this.Usercampus);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(campus: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('usercampus');
    servObj.data = campus;
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
}
