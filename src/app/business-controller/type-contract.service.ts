import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeContract } from '../models/type-contract';

@Injectable({
  providedIn: 'root'
})
export class TypeContractService {
  public type_contract: TypeContract[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeContract[]> {
    let servObj = new ServiceObject(params ? 'type_contract?pagination=false' : 'type_contract');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_contract = <TypeContract[]>servObj.data.type_contract;

        return Promise.resolve(this.type_contract);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_contract: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_contract');
    servObj.data = type_contract;
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

  Update(type_contract: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_contract', type_contract.id);
    servObj.data = type_contract;
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
    let servObj = new ServiceObject('type_contract', id);
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
