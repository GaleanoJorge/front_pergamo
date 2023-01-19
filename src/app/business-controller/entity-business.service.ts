import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import { Entity } from '../models/entity';

@Injectable({
  providedIn: 'root',
})
export class EntityBusinessService {
  public entities: Entity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Entity[]> {
    let servObj = new ServiceObject('entity');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.entities = <Entity[]>servObj.data.entitys;

        return Promise.resolve(this.entities);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
