import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssMode } from '../models/ch-ass-mode';


@Injectable({
  providedIn: 'root'
})
export class ChAssModeService {
  public ch_ass_mode: ChAssMode[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssMode[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_mode?pagination=false' : 'ch_ass_mode');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_mode = <ChAssMode[]>servObj.data.ch_ass_mode;

        return Promise.resolve(this.ch_ass_mode);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_mode: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_mode');
    servObj.data = ch_ass_mode;
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

  Update(ch_ass_mode: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_mode', ch_ass_mode.id);
    servObj.data = ch_ass_mode;
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
    let servObj = new ServiceObject('ch_ass_mode', id);
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
