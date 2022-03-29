import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ContractType } from '../models/contract-type';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {
  public contract_type: ContractType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ContractType[]> {
    let servObj = new ServiceObject(params ? 'contract_type?pagination=false' : 'contract_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.contract_type = <ContractType[]>servObj.data.contract_type;

        return Promise.resolve(this.contract_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(contract_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_type');
    servObj.data = contract_type;
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

  Update(contract_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_type', contract_type.id);
    servObj.data = contract_type;
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
    let servObj = new ServiceObject('contract_type', id);
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
