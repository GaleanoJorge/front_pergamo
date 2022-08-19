import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserAgreement } from '../models/user-agreement';

@Injectable({
  providedIn: 'root'
})
export class UserAgreementService {
  public UserAgreement: UserAgreement[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<UserAgreement[]> {
    let servObj = new ServiceObject(params ? 'user_agreement?pagination=false' : 'user_agreement');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.UserAgreement = <UserAgreement[]>servObj.data.user_agreement;

        return Promise.resolve(this.UserAgreement);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(UserAgreement: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_agreement');
    servObj.data = UserAgreement;
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

  Update(UserAgreement: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('user_agreement', UserAgreement.id);
    servObj.data = UserAgreement;
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
    let servObj = new ServiceObject('user_agreement', id);
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
