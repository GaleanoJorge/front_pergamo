import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { SpeechTl } from '../models/speech-tl';

@Injectable({
  providedIn: 'root'
})
export class SpeechTlService {
  public speech_tl: SpeechTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SpeechTl[]> {
    let servObj = new ServiceObject(params ? 'speech_tl?pagination=false' : 'speech_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.speech_tl = <SpeechTl[]>servObj.data.speech_tl;

        return Promise.resolve(this.speech_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(speech_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('speech_tl');
    servObj.data = speech_tl;
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

  Update(speech_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('speech_tl', speech_tl.id);
    servObj.data = speech_tl;
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
    let servObj = new ServiceObject('speech_tl', id);
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
