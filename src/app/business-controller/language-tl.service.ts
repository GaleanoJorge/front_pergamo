import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { LanguageTl } from '../models/language-tl';

@Injectable({
  providedIn: 'root'
})
export class LanguageTlService {
  public language_tl: LanguageTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<LanguageTl[]> {
    let servObj = new ServiceObject(params ? 'language_tl?pagination=false' : 'language_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.language_tl = <LanguageTl[]>servObj.data.language_tl;

        return Promise.resolve(this.language_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(language_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('language_tl');
    servObj.data = language_tl;
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

  Update(language_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('language_tl', language_tl.id);
    servObj.data = language_tl;
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
    let servObj = new ServiceObject('language_tl', id);
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
