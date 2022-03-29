import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyCiiu } from '../models/company-ciiu';

@Injectable({
  providedIn: 'root'
})
export class CompanyCiiuService {
  public company_ciiu: CompanyCiiu[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyCiiu[]> {
    let servObj = new ServiceObject(params ? 'company_ciiu?pagination=false' : 'company_ciiu');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_ciiu = <CompanyCiiu[]>servObj.data.company_ciiu;

        return Promise.resolve(this.company_ciiu);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_ciiu: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_ciiu');
    servObj.data = company_ciiu;
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

  Update(company_ciiu: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_ciiu', company_ciiu.id);
    servObj.data = company_ciiu;
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
    let servObj = new ServiceObject('company_ciiu', id);
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
