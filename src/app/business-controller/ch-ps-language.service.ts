import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsLanguage } from '../models/ch-ps-language';


@Injectable({
  providedIn: 'root'
})
export class ChPsLanguageService {
  public ch_ps_language: ChPsLanguage[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsLanguage[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_language?pagination=false' : 'ch_ps_language');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_language = <ChPsLanguage[]>servObj.data.ch_ps_language;

        return Promise.resolve(this.ch_ps_language);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_language: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_language');
    servObj.data = ch_ps_language;
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

  Update(ch_ps_language: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_language', ch_ps_language.id);
    servObj.data = ch_ps_language;
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
    let servObj = new ServiceObject('ch_ps_language', id);
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
