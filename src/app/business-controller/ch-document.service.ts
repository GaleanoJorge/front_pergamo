import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChDocument } from '../models/ch-document';

@Injectable({
  providedIn: 'root'
})
export class ChDocumentService {
  public ch_document: ChDocument[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChDocument[]> {
    let servObj = new ServiceObject(params ? 'ch_document?pagination=false' : 'ch_document');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_document = <ChDocument[]>servObj.data.ch_document;

        return Promise.resolve(this.ch_document);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewCI(admission_id: any, params: any = {}): any {
    let servObj = new ServiceObject('viewCI/' + admission_id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_document: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_document');
    servObj.data = ch_document;
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

  Update(ch_document: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_document', ch_document.id);
    servObj.data = ch_document;
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
    let servObj = new ServiceObject('ch_document', id);
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
