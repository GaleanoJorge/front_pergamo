import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedCode } from '../models/fixed-code';

@Injectable({
  providedIn: 'root'
})
export class FixedCodeService {
  public fixed_code: FixedCode[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedCode[]> {
    let servObj = new ServiceObject(params ? 'fixed_code?pagination=false' : 'fixed_code');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_code = <FixedCode[]>servObj.data.fixed_code;

        return Promise.resolve(this.fixed_code);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_code');
    servObj.data = fixed_code;
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

  Update(fixed_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_code', fixed_code.id);
    servObj.data = fixed_code;
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
    let servObj = new ServiceObject('fixed_code', id);
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
