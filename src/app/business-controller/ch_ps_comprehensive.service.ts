import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsComprehensive } from '../models/ch-ps-comprehensive';

@Injectable({
  providedIn: 'root'
})
export class ChPsComprehensiveService {
  public ch_ps_comprehensive: ChPsComprehensive[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsComprehensive[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_comprehensive?pagination=false' : 'ch_ps_comprehensive');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_comprehensive = <ChPsComprehensive[]>servObj.data.ch_ps_comprehensive;

        return Promise.resolve(this.ch_ps_comprehensive);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_comprehensive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_comprehensive');
    servObj.data = ch_ps_comprehensive;
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

  Update(ch_ps_comprehensive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_comprehensive', ch_ps_comprehensive.id);
    servObj.data = ch_ps_comprehensive;
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
    let servObj = new ServiceObject('ch_ps_comprehensive', id);
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
