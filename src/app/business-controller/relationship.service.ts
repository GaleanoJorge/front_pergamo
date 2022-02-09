import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Relationship } from '../models/relationship';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  public relationship: Relationship[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Relationship[]> {
    let servObj = new ServiceObject(params ? 'relationship?pagination=false' : 'relationship');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.relationship = <Relationship[]>servObj.data.relationship;

        return Promise.resolve(this.relationship);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(relationship: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('relationship');
    servObj.data = relationship;
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

  Update(relationship: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('relationship', relationship.id);
    servObj.data = relationship;
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
    let servObj = new ServiceObject('relationship', id);
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
