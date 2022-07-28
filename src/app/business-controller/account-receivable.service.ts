import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AccountReceivable } from '../models/account-receivable';

@Injectable({
  providedIn: 'root'
})
export class AccountReceivableService {
  public account_receivable: AccountReceivable[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AccountReceivable[]> {
    let servObj = new ServiceObject(params ? 'account_receivable?pagination=false' : 'account_receivable');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.account_receivable = <AccountReceivable[]>servObj.data.account_receivable;

        return Promise.resolve(this.account_receivable);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(account_receivable: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_receivable');
    servObj.data = account_receivable;
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

  SaveFile(account_receivable: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fileUpload_account_receivable');
    servObj.data = account_receivable;
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

  Update(account_receivable: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_receivable', account_receivable.id);
    servObj.data = account_receivable;
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

  saveFile(account_receivable: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_receivable_file', (account_receivable.id ? account_receivable.id : id));
    servObj.data = account_receivable;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_receivable', id);
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

  GenerateFile(id, account_receivable= {}): Promise<ServiceObject> {
    let servObj = new ServiceObject('account_receivable/generate_file/'+id);
    // servObj.data = account_receivable;
    return this.webAPI.GetAction(servObj, account_receivable)
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
