import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ObjetionCode } from '../models/objetion-code';

@Injectable({
  providedIn: 'root'
})
export class ObjetionCodeService {
  public objetion_code: ObjetionCode[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ObjetionCode[]> {
    let servObj = new ServiceObject(params ? 'objetion_code?pagination=false' : 'objetion_code');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.objetion_code = <ObjetionCode[]>servObj.data.objetion_code;

        return Promise.resolve(this.objetion_code);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(objetion_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_code');
    servObj.data = objetion_code;
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

  Update(objetion_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_code', objetion_code.id);
    servObj.data = objetion_code;
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
    let servObj = new ServiceObject('objetion_code', id);
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
