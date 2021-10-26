import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ContractStatus } from '../models/contract-status';

@Injectable({
  providedIn: 'root'
})
export class ContractStatusService {
  public contract_status: ContractStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ContractStatus[]> {
    let servObj = new ServiceObject(params ? 'contract_status?pagination=false' : 'contract_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.contract_status = <ContractStatus[]>servObj.data.contract_status;

        return Promise.resolve(this.contract_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(contract_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_status');
    servObj.data = contract_status;
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

  Update(contract_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_status', contract_status.id);
    servObj.data = contract_status;
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
    let servObj = new ServiceObject('contract_status', id);
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
