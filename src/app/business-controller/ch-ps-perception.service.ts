import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsPerception } from '../models/ch-ps-perception';

@Injectable({
  providedIn: 'root'
})
export class ChPsPerceptionService {
  public ch_ps_perception: ChPsPerception[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsPerception[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_perception?pagination=false' : 'ch_ps_perception');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_perception = <ChPsPerception[]>servObj.data.ch_ps_perception;

        return Promise.resolve(this.ch_ps_perception);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_perception: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_perception');
    servObj.data = ch_ps_perception;
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

  Update(ch_ps_perception: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_perception', ch_ps_perception.id);
    servObj.data = ch_ps_perception;
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
    let servObj = new ServiceObject('ch_ps_perception', id);
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
