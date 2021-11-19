import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ObjetionResponse } from '../models/objetion-response';

@Injectable({
  providedIn: 'root'
})
export class ObjetionResponseService {
  public objetion_response: ObjetionResponse[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ObjetionResponse[]> {
    let servObj = new ServiceObject(params ? 'objetion_response?pagination=false' : 'objetion_response');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.objetion_response = <ObjetionResponse[]>servObj.data.objetion_response;

        return Promise.resolve(this.objetion_response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(objetion_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_response');
    servObj.data = objetion_response;
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

  Update(objetion_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_response', objetion_response.id);
    servObj.data = objetion_response;
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
    let servObj = new ServiceObject('objetion_response', id);
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
