import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChLaboratory } from '../models/ch_laboratory';

@Injectable({
  providedIn: 'root'
})
export class ChLaboratoryService {
  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChLaboratory[]> {
    let servObj = new ServiceObject(params ? 'ch_laboratory?pagination=false' : 'ch_laboratory');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        let ch_laboratory = <ChLaboratory[]>servObj.data.ch_laboratory;

        return Promise.resolve(ch_laboratory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_laboratory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_laboratory');
    servObj.data = ch_laboratory;
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

  Update(ch_laboratory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_laboratory_update');
    servObj.data = ch_laboratory;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_laboratory', id);
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
