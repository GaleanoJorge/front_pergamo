import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyKindperson } from '../models/company-kindperson';

@Injectable({
  providedIn: 'root'
})
export class CompanyKindpersonService {
  public company_kindperson: CompanyKindperson[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyKindperson[]> {
    let servObj = new ServiceObject(params ? 'company_kindperson?pagination=false' : 'company_kindperson');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_kindperson = <CompanyKindperson[]>servObj.data.company_kindperson;

        return Promise.resolve(this.company_kindperson);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_kindperson: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_kindperson');
    servObj.data = company_kindperson;
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

  Update(company_kindperson: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_kindperson', company_kindperson.id);
    servObj.data = company_kindperson;
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
    let servObj = new ServiceObject('company_kindperson', id);
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
