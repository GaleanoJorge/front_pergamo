import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwExpenses } from '../models/ch-sw-expenses';

@Injectable({
  providedIn: 'root'
})
export class ChSwExpensesService {
  public ch_sw_expenses: ChSwExpenses[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwExpenses[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_expenses?pagination=false' : 'ch_sw_expenses');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_expenses = <ChSwExpenses[]>servObj.data.ch_sw_expenses;

        return Promise.resolve(this.ch_sw_expenses);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_expenses: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_expenses');
    servObj.data = ch_sw_expenses;
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

  Update(ch_sw_expenses: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_expenses', ch_sw_expenses.id);
    servObj.data = ch_sw_expenses;
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
    let servObj = new ServiceObject('ch_sw_expenses', id);
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
