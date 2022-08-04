import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwIncome } from '../models/ch-sw-income';

@Injectable({
  providedIn: 'root'
})
export class ChSwIncomeService {
  public ch_sw_income: ChSwIncome[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwIncome[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_income?pagination=false' : 'ch_sw_income');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_income = <ChSwIncome[]>servObj.data.ch_sw_income;

        return Promise.resolve(this.ch_sw_income);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_income: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_income');
    servObj.data = ch_sw_income;
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

  Update(ch_sw_income: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_income', ch_sw_income.id);
    servObj.data = ch_sw_income;
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
    let servObj = new ServiceObject('ch_sw_income', id);
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
