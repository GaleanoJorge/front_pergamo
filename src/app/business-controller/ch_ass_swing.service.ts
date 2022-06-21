import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssSwing } from '../models/ch-ass-swing';


@Injectable({
  providedIn: 'root'
})
export class ChAssSwingService {
  public ch_ass_swing: ChAssSwing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssSwing[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_swing?pagination=false' : 'ch_ass_swing');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_swing = <ChAssSwing[]>servObj.data.ch_ass_swing;

        return Promise.resolve(this.ch_ass_swing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_swing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_swing');
    servObj.data = ch_ass_swing;
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

  Update(ch_ass_swing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_swing', ch_ass_swing.id);
    servObj.data = ch_ass_swing;
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
    let servObj = new ServiceObject('ch_ass_swing', id);
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
