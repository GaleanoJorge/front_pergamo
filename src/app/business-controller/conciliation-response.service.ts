import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConciliationResponse } from '../models/conciliation-response';

@Injectable({
  providedIn: 'root'
})
export class ConciliationResponseService {
  public conciliation_response: ConciliationResponse[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ConciliationResponse[]> {
    let servObj = new ServiceObject(params ? 'conciliation_response?pagination=false' : 'conciliation_response');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.conciliation_response = <ConciliationResponse[]>servObj.data.conciliation_response;

        return Promise.resolve(this.conciliation_response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(conciliation_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('conciliation_response');
    servObj.data = conciliation_response;
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

  Update(conciliation_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('conciliation_response', conciliation_response.id);
    servObj.data = conciliation_response;
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
    let servObj = new ServiceObject('conciliation_response', id);
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
