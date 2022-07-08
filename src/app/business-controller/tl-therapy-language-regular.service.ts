import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TlTherapyLanguageRegular } from '../models/tl-therapy-language-regular';

@Injectable({
  providedIn: 'root'
})
export class TlTherapyLanguageRegularService {
  public tl_therapy_language_regular: TlTherapyLanguageRegular[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TlTherapyLanguageRegular[]> {
    let servObj = new ServiceObject(params ? 'tl_therapy_language_regular?pagination=false' : 'tl_therapy_language_regular');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tl_therapy_language_regular = <TlTherapyLanguageRegular[]>servObj.data.tl_therapy_language_regular;

        return Promise.resolve(this.tl_therapy_language_regular);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(tl_therapy_language_regular: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tl_therapy_language_regular');
    servObj.data = tl_therapy_language_regular;
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

  Update(tl_therapy_language_regular: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tl_therapy_language_regular', tl_therapy_language_regular.id);
    servObj.data = tl_therapy_language_regular;
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
    let servObj = new ServiceObject('tl_therapy_language_regular', id);
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
