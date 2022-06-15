import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssFrequency } from '../models/ch-ass-frequency';


@Injectable({
  providedIn: 'root'
})
export class ChAssFrequencyService {
  public ch_ass_frequency: ChAssFrequency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssFrequency[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_frequency?pagination=false' : 'ch_ass_frequency');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_frequency = <ChAssFrequency[]>servObj.data.ch_ass_frequency;

        return Promise.resolve(this.ch_ass_frequency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_frequency');
    servObj.data = ch_ass_frequency;
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

  Update(ch_ass_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_frequency', ch_ass_frequency.id);
    servObj.data = ch_ass_frequency;
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
    let servObj = new ServiceObject('ch_ass_frequency', id);
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
