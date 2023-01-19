import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedLoan } from '../models/fixed-loan';

@Injectable({
  providedIn: 'root'
})
export class FixedLoanService {
  public fixed_loan: FixedLoan[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedLoan[]> {
    let servObj = new ServiceObject(params ? 'fixed_loan?pagination=false' : 'fixed_loan');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_loan = <FixedLoan[]>servObj.data.fixed_loan;

        return Promise.resolve(this.fixed_loan);
      })
      .catch(x => {
        throw x.message;
      });
  }

  updateInventoryByLot(fixed_loan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_loan/updateInventoryByLot', fixed_loan.id);
    servObj.data = fixed_loan;
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

  Save(fixed_loan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_loan');
    servObj.data = fixed_loan;
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

  Update(fixed_loan: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_loan', fixed_loan.id);
    servObj.data = fixed_loan;
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
    let servObj = new ServiceObject('fixed_loan', id);
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
