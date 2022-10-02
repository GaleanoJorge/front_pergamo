import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsFear } from '../models/ch-ps-fear';

@Injectable({
  providedIn: 'root'
})
export class ChPsFearService {
  public ch_ps_fear: ChPsFear[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsFear[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_fear?pagination=false' : 'ch_ps_fear');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_fear = <ChPsFear[]>servObj.data.ch_ps_fear;

        return Promise.resolve(this.ch_ps_fear);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_fear: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_fear');
    servObj.data = ch_ps_fear;
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

  Update(ch_ps_fear: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_fear', ch_ps_fear.id);
    servObj.data = ch_ps_fear;
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
    let servObj = new ServiceObject('ch_ps_fear', id);
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
