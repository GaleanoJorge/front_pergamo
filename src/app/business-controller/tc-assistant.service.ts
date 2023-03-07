import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcAssistant } from '../models/tc-assistant';



@Injectable({
  providedIn: 'root'
})
export class TcAssistantService {
  public assistant_tc: TcAssistant[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcAssistant[]> {
    let servObj = new ServiceObject(params ? 'assistant_tc?pagination=false' : 'assistant_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.assistant_tc = <TcAssistant[]>servObj.data.assistant_tc;

        return Promise.resolve(this.assistant_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(assistant_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistant_tc');
    servObj.data = assistant_tc;
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

  Update(assistant_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistant_tc', assistant_tc.id);
    servObj.data = assistant_tc;
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
    let servObj = new ServiceObject('assistant_tc', id);
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

  SaveFile(assistant_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistant_tc/file');
    servObj.data = assistant_tc;
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
}
