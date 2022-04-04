import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FinancialData } from '../models/financial-data';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {
  public financial_data: FinancialData[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FinancialData[]> {
    let servObj = new ServiceObject(params ? 'financial_data?pagination=false' : 'financial_data');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.financial_data = <FinancialData[]>servObj.data.financial_data;

        return Promise.resolve(this.financial_data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(financial_data: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('financial_data');
    servObj.data = financial_data;
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

  Update(financial_data: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('financial_data', financial_data.id);
    servObj.data = financial_data;
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
    let servObj = new ServiceObject('financial_data', id);
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
