import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { InformedConsents } from '../models/informed-consents';

@Injectable({
  providedIn: 'root'
})
export class InformedConsentsService {
  public ch_document: InformedConsents[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InformedConsents[]> {
    let servObj = new ServiceObject(params ? 'ch_document?pagination=false' : 'ch_document');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_document = <InformedConsents[]>servObj.data.ch_document;

        return Promise.resolve(this.ch_document);
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


  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_document', (sect.id ? sect.id : id));
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
