import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DocumentAccount } from '../models/document-account';

@Injectable({
  providedIn: 'root'
})
export class DocumentAccountService {
  public document_account: DocumentAccount[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DocumentAccount[]> {
    let servObj = new ServiceObject(params ? 'document_account?pagination=false' : 'document_account');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.document_account = <DocumentAccount[]>servObj.data.document_account;

        return Promise.resolve(this.document_account);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(document_account: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('document_account');
    servObj.data = document_account;
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


  Update(document_account: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('document_account', document_account.id);
    servObj.data = document_account;
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

  ChangeStatus(id): Promise<any> {
    let servObj = new ServiceObject(`user/${id}/changeStatus`);

    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('document_account', id);
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
