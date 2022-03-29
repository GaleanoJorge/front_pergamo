import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RepeatedInitial } from '../models/repeated-initial';

@Injectable({
  providedIn: 'root'
})
export class RepeatedInitialService {
  public repeated_initial: RepeatedInitial[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RepeatedInitial[]> {
    let servObj = new ServiceObject(params ? 'repeated_initial?pagination=false' : 'repeated_initial');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.repeated_initial = <RepeatedInitial[]>servObj.data.repeated_initial;

        return Promise.resolve(this.repeated_initial);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(repeated_initial: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('repeated_initial');
    servObj.data = repeated_initial;
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

  Update(repeated_initial: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('repeated_initial', repeated_initial.id);
    servObj.data = repeated_initial;
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
    let servObj = new ServiceObject('repeated_initial', id);
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
