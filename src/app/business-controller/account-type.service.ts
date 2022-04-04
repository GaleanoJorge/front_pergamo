import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AccountType } from '../models/account-type';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  public account_type: AccountType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AccountType[]> {
    let servObj = new ServiceObject(params ? 'account_type?pagination=false' : 'account_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.account_type = <AccountType[]>servObj.data.account_type;

        return Promise.resolve(this.account_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(account_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_type');
    servObj.data = account_type;
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

  Update(account_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_type', account_type.id);
    servObj.data = account_type;
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
    let servObj = new ServiceObject('account_type', id);
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
