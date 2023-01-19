import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsAssessment } from '../models/ch-ps-assessment';


@Injectable({
  providedIn: 'root'
})
export class ChPsAssessmentService {
  public ch_ps_assessment: ChPsAssessment[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAssessment[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_assessment?pagination=false' : 'ch_ps_assessment');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_assessment = <ChPsAssessment[]>servObj.data.ch_ps_assessment;

        return Promise.resolve(this.ch_ps_assessment);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_assessment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_assessment');
    servObj.data = ch_ps_assessment;
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

  Update(ch_ps_assessment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_assessment', ch_ps_assessment.id);
    servObj.data = ch_ps_assessment;
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
    let servObj = new ServiceObject('ch_ps_assessment', id);
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
