import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssPattern } from '../models/ch-ass-pattern';


@Injectable({
  providedIn: 'root'
})
export class ChAssPatternService {
  public ch_ass_pattern: ChAssPattern[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssPattern[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_pattern?pagination=false' : 'ch_ass_pattern');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_pattern = <ChAssPattern[]>servObj.data.ch_ass_pattern;

        return Promise.resolve(this.ch_ass_pattern);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_pattern: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_pattern');
    servObj.data = ch_ass_pattern;
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

  Update(ch_ass_pattern: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_pattern', ch_ass_pattern.id);
    servObj.data = ch_ass_pattern;
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
    let servObj = new ServiceObject('ch_ass_pattern', id);
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
