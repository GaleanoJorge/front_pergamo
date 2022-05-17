import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public contract: Contract[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Contract[]> {
    let servObj = new ServiceObject(params ? 'contract?pagination=false' : 'contract');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.contract = <Contract[]>servObj.data.contract;

        return Promise.resolve(this.contract);
      })
      .catch(x => {
        throw x.message;
      });
  }
  GetByCompany(contract: any): Promise<Contract[]> {
    let servObj = new ServiceObject('contractByCompany', contract.id);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.contract = <Contract[]>servObj.data.contract;

        return Promise.resolve(this.contract);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  // GetContractById(id): Promise<Contract[]> {
  //   let servObj = new ServiceObject('Policy/FileByContract', id);

  //   return this.webAPI.GetAction(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       this.contract = <Contract[]>servObj.data.contract;

  //       return Promise.resolve(this.contract);
  //     })
  //     .catch(x => {
  //       throw x.message;
  //     });
  // }

  Save(contract: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract');
    servObj.data = contract;
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

  Update(contract: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract', contract.id);
    servObj.data = contract;
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
    let servObj = new ServiceObject('contract', id);
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
