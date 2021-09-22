import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyFiscal } from '../models/company-fiscal';

@Injectable({
  providedIn: 'root'
})
export class CompanyFiscalService {
  public company_fiscal: CompanyFiscal[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyFiscal[]> {
    let servObj = new ServiceObject(params ? 'company_fiscal?pagination=false' : 'company_fiscal');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_fiscal = <CompanyFiscal[]>servObj.data.company_fiscal;

        return Promise.resolve(this.company_fiscal);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_fiscal: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_fiscal');
    servObj.data = company_fiscal;
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

  Update(company_fiscal: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_fiscal', company_fiscal.id);
    servObj.data = company_fiscal;
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
    let servObj = new ServiceObject('company_fiscal', id);
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
