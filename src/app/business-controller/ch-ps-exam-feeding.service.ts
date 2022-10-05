import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsFeeding } from '../models/ch-ps-exam-feeding';

@Injectable({
  providedIn: 'root'
})
export class ChPsFeedingService {
  public ch_ps_feeding: ChPsFeeding[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsFeeding[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_feeding?pagination=false' : 'ch_ps_feeding');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_feeding = <ChPsFeeding[]>servObj.data.ch_ps_feeding;

        return Promise.resolve(this.ch_ps_feeding);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_feeding: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_feeding');
    servObj.data = ch_ps_feeding;
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

  Update(ch_ps_feeding: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_feeding', ch_ps_feeding.id);
    servObj.data = ch_ps_feeding;
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
    let servObj = new ServiceObject('ch_ps_feeding', id);
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
