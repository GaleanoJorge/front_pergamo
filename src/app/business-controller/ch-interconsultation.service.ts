import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChInterconsultation } from '../models/ch-interconsultation';

@Injectable({
  providedIn: 'root'
})
export class ChInterconsultationService {
  public ch_interconsultation: ChInterconsultation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChInterconsultation[]> {
    let servObj = new ServiceObject(params ? 'ch_interconsultation?pagination=false' : 'ch_interconsultation');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_interconsultation = <ChInterconsultation[]>servObj.data.ch_interconsultation;

        return Promise.resolve(this.ch_interconsultation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_interconsultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_interconsultation');
    servObj.data = ch_interconsultation;
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

  Update(ch_interconsultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_interconsultation', ch_interconsultation.id);
    servObj.data = ch_interconsultation;
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
    let servObj = new ServiceObject('ch_interconsultation', id);
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
