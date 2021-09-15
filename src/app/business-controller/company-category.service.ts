import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyCategory } from '../models/company-category';

@Injectable({
  providedIn: 'root'
})
export class CompanyCategoryService {
  public company_category: CompanyCategory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyCategory[]> {
    let servObj = new ServiceObject(params ? 'company_category?pagination=false' : 'company_category');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_category = <CompanyCategory[]>servObj.data.company_category;

        return Promise.resolve(this.company_category);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_category');
    servObj.data = company_category;
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

  Update(company_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_category', company_category.id);
    servObj.data = company_category;
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
    let servObj = new ServiceObject('company_category', id);
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
