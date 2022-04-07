import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BankInformation } from '../models/bank-information';

@Injectable({
  providedIn: 'root'
})
export class BankInformationService {
  public bank_information: BankInformation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BankInformation[]> {
    let servObj = new ServiceObject(params ? 'bank_information?pagination=false' : 'bank_information');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bank_information = <BankInformation[]>servObj.data.bank_information;

        return Promise.resolve(this.bank_information);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(bank_information: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bank_information');
    servObj.data = bank_information;
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

  Update(bank_information: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bank_information', bank_information.id);
    servObj.data = bank_information;
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
    let servObj = new ServiceObject('bank_information', id);
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
