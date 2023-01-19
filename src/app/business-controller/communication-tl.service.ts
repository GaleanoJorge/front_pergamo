import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { CommunicationTl } from '../models/communication-tl';

@Injectable({
  providedIn: 'root'
})
export class CommunicationTlService {
  public communication_tl: CommunicationTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CommunicationTl[]> {
    let servObj = new ServiceObject(params ? 'communication_tl?pagination=false' : 'communication_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.communication_tl = <CommunicationTl[]>servObj.data.communication_tl;

        return Promise.resolve(this.communication_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(communication_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('communication_tl');
    servObj.data = communication_tl;
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

  Update(communication_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('communication_tl', communication_tl.id);
    servObj.data = communication_tl;
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
    let servObj = new ServiceObject('communication_tl', id);
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
