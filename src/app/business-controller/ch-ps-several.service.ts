import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSeveral } from '../models/ch-ps-several';

@Injectable({
  providedIn: 'root'
})
export class ChPsSeveralService {
  public ch_ps_several: ChPsSeveral[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSeveral[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_several?pagination=false' : 'ch_ps_several');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_several = <ChPsSeveral[]>servObj.data.ch_ps_several;

        return Promise.resolve(this.ch_ps_several);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_several: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_several');
    servObj.data = ch_ps_several;
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

  Update(ch_ps_several: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_several', ch_ps_several.id);
    servObj.data = ch_ps_several;
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
    let servObj = new ServiceObject('ch_ps_several', id);
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
