import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSynthesis } from '../models/ch-ps-synthesis';


@Injectable({
  providedIn: 'root'
})
export class ChPsSynthesisService {
  public ch_ps_synthesis: ChPsSynthesis[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSynthesis[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_synthesis?pagination=false' : 'ch_ps_synthesis');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_synthesis = <ChPsSynthesis[]>servObj.data.ch_ps_synthesis;

        return Promise.resolve(this.ch_ps_synthesis);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_synthesis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_synthesis');
    servObj.data = ch_ps_synthesis;
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

  Update(ch_ps_synthesis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_synthesis', ch_ps_synthesis.id);
    servObj.data = ch_ps_synthesis;
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
    let servObj = new ServiceObject('ch_ps_synthesis', id);
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
