import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSexuality } from '../models/ch-ps-exam-sexuality';

@Injectable({
  providedIn: 'root'
})
export class ChPsSexualityService {
  public ch_ps_sexuality: ChPsSexuality[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSexuality[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_sexuality?pagination=false' : 'ch_ps_sexuality');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_sexuality = <ChPsSexuality[]>servObj.data.ch_ps_sexuality;

        return Promise.resolve(this.ch_ps_sexuality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_sexuality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sexuality');
    servObj.data = ch_ps_sexuality;
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

  Update(ch_ps_sexuality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sexuality', ch_ps_sexuality.id);
    servObj.data = ch_ps_sexuality;
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
    let servObj = new ServiceObject('ch_ps_sexuality', id);
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
