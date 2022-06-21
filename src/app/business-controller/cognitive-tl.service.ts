import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { CognitiveTl } from '../models/cognitive-tl';

@Injectable({
  providedIn: 'root'
})
export class CognitiveTlService {
  public cognitive_tl: CognitiveTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CognitiveTl[]> {
    let servObj = new ServiceObject(params ? 'cognitive_tl?pagination=false' : 'cognitive_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.cognitive_tl = <CognitiveTl[]>servObj.data.cognitive_tl;

        return Promise.resolve(this.cognitive_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(cognitive_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('cognitive_tl');
    servObj.data = cognitive_tl;
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

  Update(cognitive_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('cognitive_tl', cognitive_tl.id);
    servObj.data = cognitive_tl;
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
    let servObj = new ServiceObject('cognitive_tl', id);
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
