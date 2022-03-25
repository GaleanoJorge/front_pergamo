import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChReasonConsultation } from '../models/ch-reason-consultation';

@Injectable({
  providedIn: 'root'
})
export class ChReasonConsultationService {
  public ch_reason_consultation: ChReasonConsultation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChReasonConsultation[]> {
    let servObj = new ServiceObject(params ? 'ch_reason_consultation?pagination=false' : 'ch_reason_consultation');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_reason_consultation = <ChReasonConsultation[]>servObj.data.ch_reason_consultation;

        return Promise.resolve(this.ch_reason_consultation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_reason_consultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_reason_consultation');
    servObj.data = ch_reason_consultation;
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

  Update(ch_reason_consultation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_reason_consultation', ch_reason_consultation.id);
    servObj.data = ch_reason_consultation;
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
    let servObj = new ServiceObject('ch_reason_consultation', id);
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
