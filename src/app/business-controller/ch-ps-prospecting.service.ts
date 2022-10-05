import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsProspecting } from '../models/ch-ps-prospecting';

@Injectable({
  providedIn: 'root'
})
export class ChPsProspectingService {
  public ch_ps_prospecting: ChPsProspecting[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsProspecting[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_prospecting?pagination=false' : 'ch_ps_prospecting');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_prospecting = <ChPsProspecting[]>servObj.data.ch_ps_prospecting;

        return Promise.resolve(this.ch_ps_prospecting);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_prospecting: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_prospecting');
    servObj.data = ch_ps_prospecting;
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

  Update(ch_ps_prospecting: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_prospecting', ch_ps_prospecting.id);
    servObj.data = ch_ps_prospecting;
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
    let servObj = new ServiceObject('ch_ps_prospecting', id);
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
