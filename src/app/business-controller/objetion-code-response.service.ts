import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ObjetionCodeResponse } from '../models/objetion-code-response';

@Injectable({
  providedIn: 'root'
})
export class ObjetionCodeResponseService {
  public objetion_code_response: ObjetionCodeResponse[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ObjetionCodeResponse[]> {
    let servObj = new ServiceObject(params ? 'objetion_code_response?pagination=false' : 'objetion_code_response');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.objetion_code_response = <ObjetionCodeResponse[]>servObj.data.objetion_code_response;

        return Promise.resolve(this.objetion_code_response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(objetion_code_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_code_response');
    servObj.data = objetion_code_response;
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

  Update(objetion_code_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_code_response', objetion_code_response.id);
    servObj.data = objetion_code_response;
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
    let servObj = new ServiceObject('objetion_code_response', id);
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
