import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyType } from '../models/company-type';

@Injectable({
  providedIn: 'root'
})
export class CompanyTypeService {
  public company_type: CompanyType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyType[]> {
    let servObj = new ServiceObject(params ? 'company_type?pagination=false' : 'company_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_type = <CompanyType[]>servObj.data.company_type;

        return Promise.resolve(this.company_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_type');
    servObj.data = company_type;
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

  Update(company_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_type', company_type.id);
    servObj.data = company_type;
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
    let servObj = new ServiceObject('company_type', id);
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
