import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TlTherapyLanguage } from '../models/tl-therapy-language';

@Injectable({
  providedIn: 'root'
})
export class TlTherapyLanguageService {
  public tl_therapy_language: TlTherapyLanguage[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TlTherapyLanguage[]> {
    let servObj = new ServiceObject(params ? 'tl_therapy_language?pagination=false' : 'tl_therapy_language');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tl_therapy_language = <TlTherapyLanguage[]>servObj.data.tl_therapy_language;

        return Promise.resolve(this.tl_therapy_language);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(tl_therapy_language: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tl_therapy_language');
    servObj.data = tl_therapy_language;
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

  Update(tl_therapy_language: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tl_therapy_language', tl_therapy_language.id);
    servObj.data = tl_therapy_language;
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
    let servObj = new ServiceObject('tl_therapy_language', id);
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
