import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public document: Document[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Document[]> {
    let servObj = new ServiceObject(params ? 'document?pagination=false' : 'document');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.document = <Document[]>servObj.data.document;

        return Promise.resolve(this.document);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(document: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('document');
    servObj.data = document;
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


  Update(document: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('document', document.id);
    servObj.data = document;
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
    let servObj = new ServiceObject('document', id);
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
