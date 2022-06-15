import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssessmentTherapy } from '../models/ch-assessment-therapy';

@Injectable({
  providedIn: 'root'
})
export class ChAssessmentTherapyService {
  public ch_therapeutic_ass: ChAssessmentTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssessmentTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_therapeutic_ass?pagination=false' : 'ch_therapeutic_ass');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_therapeutic_ass = <ChAssessmentTherapy[]>servObj.data.ch_therapeutic_ass;

        return Promise.resolve(this.ch_therapeutic_ass);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_therapeutic_ass: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_therapeutic_ass');
    servObj.data = ch_therapeutic_ass;
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

  Update(ch_therapeutic_ass: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_therapeutic_ass', ch_therapeutic_ass.id);
    servObj.data = ch_therapeutic_ass;
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
    let servObj = new ServiceObject('ch_therapeutic_ass', id);
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
