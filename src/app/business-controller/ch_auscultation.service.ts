import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAuscultation } from '../models/ch-auscultation';

@Injectable({
  providedIn: 'root'
})
export class ChAuscultationService {
  public ch_auscultation:ChAuscultation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAuscultation[]> {
    let servObj = new ServiceObject(params ? 'ch_auscultation?pagination=false' : 'ch_auscultation');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_auscultation = <ChAuscultation[]>servObj.data.ch_auscultation;

        return Promise.resolve(this.ch_auscultation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_auscultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_auscultation');
    servObj.data = ch_auscultation;
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

  Update(ch_auscultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_auscultation', ch_auscultation.id);
    servObj.data = ch_auscultation;
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
    let servObj = new ServiceObject('ch_auscultation', id);
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
