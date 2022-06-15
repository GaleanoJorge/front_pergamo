import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { VoiceAlterationsTl } from '../models/voice-alterations-tl';

@Injectable({
  providedIn: 'root'
})
export class VoiceAlterationsTlService {
  public voice_alterations_tl: VoiceAlterationsTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<VoiceAlterationsTl[]> {
    let servObj = new ServiceObject(params ? 'voice_alterations_tl?pagination=false' : 'voice_alterations_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.voice_alterations_tl = <VoiceAlterationsTl[]>servObj.data.voice_alterations_tl;

        return Promise.resolve(this.voice_alterations_tl); 
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(voice_alterations_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('voice_alterations_tl');
    servObj.data = voice_alterations_tl;
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

  Update(voice_alterations_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('voice_alterations_tl', voice_alterations_tl.id);
    servObj.data = voice_alterations_tl;
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
    let servObj = new ServiceObject('voice_alterations_tl', id);
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
