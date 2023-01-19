import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssSigns } from '../models/ch-ass-signs';

@Injectable({
  providedIn: 'root'
})
export class ChAssSignsService {
  public ch_ass_signs: ChAssSigns[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssSigns[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_signs?pagination=false' : 'ch_ass_signs');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_signs = <ChAssSigns[]>servObj.data.ch_ass_signs;

        return Promise.resolve(this.ch_ass_signs);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_signs');
    servObj.data = ch_ass_signs;
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

  Update(ch_ass_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_signs', ch_ass_signs.id);
    servObj.data = ch_ass_signs;
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
    let servObj = new ServiceObject('ch_ass_signs', id);
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
