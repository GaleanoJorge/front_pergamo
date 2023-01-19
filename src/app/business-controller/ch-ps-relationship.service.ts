import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsRelationship } from '../models/ch-ps-exam-relationship';

@Injectable({
  providedIn: 'root'
})
export class ChPsRelationshipService {
  public ch_ps_relationship: ChPsRelationship[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsRelationship[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_relationship?pagination=false' : 'ch_ps_relationship');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_relationship = <ChPsRelationship[]>servObj.data.ch_ps_relationship;

        return Promise.resolve(this.ch_ps_relationship);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_relationship: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_relationship');
    servObj.data = ch_ps_relationship;
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

  Update(ch_ps_relationship: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_relationship', ch_ps_relationship.id);
    servObj.data = ch_ps_relationship;
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
    let servObj = new ServiceObject('ch_ps_relationship', id);
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
