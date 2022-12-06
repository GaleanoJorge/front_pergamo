import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsInsufficiency } from '../models/ch-ps-insufficiency';

@Injectable({
  providedIn: 'root'
})
export class ChPsInsufficiencyService {
  public ch_ps_insufficiency: ChPsInsufficiency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsInsufficiency[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_insufficiency?pagination=false' : 'ch_ps_insufficiency');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_insufficiency = <ChPsInsufficiency[]>servObj.data.ch_ps_insufficiency;

        return Promise.resolve(this.ch_ps_insufficiency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_insufficiency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_insufficiency');
    servObj.data = ch_ps_insufficiency;
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

  Update(ch_ps_insufficiency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_insufficiency', ch_ps_insufficiency.id);
    servObj.data = ch_ps_insufficiency;
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
    let servObj = new ServiceObject('ch_ps_insufficiency', id);
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
