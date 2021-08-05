import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class EventConceptBusinessService extends BaseBusinessService {
  public DEFAULT_CONCEPT_TRANSPORTE = 2;
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'eventConcept', 'event_concepts', 'event_concept');
  }

  Update(data: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject(this.entity, id ? id : data.id);
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  SavePlanned(data: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('projectEventConcept');
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  UpdatePlanned(data: any, id): Promise<ServiceObject> {
    let servObj = new ServiceObject('projectEventConcept', id);
    servObj.data = data;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  SaveSpecials(data: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('specialEventConcept');
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  UpdateSpecials(data: any, id: number): Promise<ServiceObject> {
    let servObj = new ServiceObject('specialEventConcept', id);
    servObj.data = data;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  SaveExecuteArray(data) {
    let servObj = new ServiceObject('executeEventConceptArray');
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }
}
