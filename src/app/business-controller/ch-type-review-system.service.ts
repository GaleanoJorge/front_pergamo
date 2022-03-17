import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeReviewSystem } from '../models/ch-type-review-system';

@Injectable({
  providedIn: 'root'
})
export class ChTypeReviewSystemService {
  public type_review_system: ChTypeReviewSystem[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeReviewSystem[]> {
    let servObj = new ServiceObject(params ? 'type_review_system?pagination=false' : 'type_review_system');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_review_system = <ChTypeReviewSystem[]>servObj.data.type_review_system;

        return Promise.resolve(this.type_review_system);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_review_system: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_review_system');
    servObj.data = type_review_system;
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

  Update(type_review_system: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_review_system', type_review_system.id);
    servObj.data = type_review_system;
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
    let servObj = new ServiceObject('type_review_system', id);
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
