import { EntityType } from '../models/entity-type';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { Campus } from '../models/campus';

@Injectable({
  providedIn: 'root'
})
export class EntityTypeService {
  public entities: EntityType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(): Promise<EntityType[]> {
    let servObj = new ServiceObject('entityType');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.entities = <EntityType[]>servObj.data.entities.data;
        return Promise.resolve(this.entities);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Save(ent: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('entityType');
    servObj.data = ent;
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

  Update(ent: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('entityType', ent.id);
    servObj.data = ent;
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
    let servObj = new ServiceObject('entityType', id);
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
