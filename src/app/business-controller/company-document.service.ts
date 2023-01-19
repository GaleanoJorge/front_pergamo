import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CompanyDocument } from '../models/company-document';

@Injectable({
  providedIn: 'root'
})
export class CompanyDocumentService {
  public company_document: CompanyDocument[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CompanyDocument[]> {
    let servObj = new ServiceObject(params ? 'company_document?pagination=false' : 'company_document');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.company_document = <CompanyDocument[]>servObj.data.company_document;

        return Promise.resolve(this.company_document);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(company_document: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_document');
    servObj.data = company_document;
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


  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_document', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }


  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('company_document', id);
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
