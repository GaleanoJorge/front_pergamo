import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TherapyConceptTl } from '../models/therapy-concept-tl';

@Injectable({
  providedIn: 'root'
})
export class TherapyConceptTlService {
  public therapy_concept_tl: TherapyConceptTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TherapyConceptTl[]> {
    let servObj = new ServiceObject(params ? 'therapy_concept_tl?pagination=false' : 'therapy_concept_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.therapy_concept_tl = <TherapyConceptTl[]>servObj.data.therapy_concept_tl;

        return Promise.resolve(this.therapy_concept_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(therapy_concept_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('therapy_concept_tl');
    servObj.data = therapy_concept_tl;
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

  Update(therapy_concept_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('therapy_concept_tl', therapy_concept_tl.id);
    servObj.data = therapy_concept_tl;
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
    let servObj = new ServiceObject('therapy_concept_tl', id);
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
