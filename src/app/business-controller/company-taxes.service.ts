import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyTaxes } from '../models/company-taxes';

@Injectable({
  providedIn: 'root'
})
export class CompanyTaxesService {
  public company_taxes: CompanyTaxes[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyTaxes[]> {
    let servObj = new ServiceObject(params ? 'company_taxes?pagination=false' : 'company_taxes');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_taxes = <CompanyTaxes[]>servObj.data.company_taxes;

        return Promise.resolve(this.company_taxes);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_taxes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_taxes');
    servObj.data = company_taxes;
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

  Update(company_taxes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_taxes', company_taxes.id);
    servObj.data = company_taxes;
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
    let servObj = new ServiceObject('company_taxes', id);
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
