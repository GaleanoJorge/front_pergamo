import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyMail } from '../models/company-mail';

@Injectable({
  providedIn: 'root'
})
export class CompanyMailService {
  public company_mail: CompanyMail[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyMail[]> {
    let servObj = new ServiceObject(params ? 'company_mail?pagination=false' : 'company_mail');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_mail = <CompanyMail[]>servObj.data.company_mail;

        return Promise.resolve(this.company_mail);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_mail: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_mail');
    servObj.data = company_mail;
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



  Update(company_mail: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_mail', company_mail.id);
    servObj.data = company_mail;
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
    let servObj = new ServiceObject('company_mail', id);
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
