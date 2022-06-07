import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  public bank: Bank[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Bank[]> {
    let servObj = new ServiceObject(params ? 'bank?pagination=false' : 'bank');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bank = <Bank[]>servObj.data.bank;

        return Promise.resolve(this.bank);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(bank: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bank');
    servObj.data = bank;
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

  Update(bank: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bank', bank.id);
    servObj.data = bank;
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
    let servObj = new ServiceObject('bank', id);
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
