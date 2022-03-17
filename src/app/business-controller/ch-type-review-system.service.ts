import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeReviewSystem } from '../models/ch-type-review-system';

@Injectable({
  providedIn: 'root'
})
export class ChTypeReviewSystemService {
  public ch_entry_review_system: ChTypeReviewSystem[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeReviewSystem[]> {
    let servObj = new ServiceObject(params ? 'ch_entry_review_system?pagination=false' : 'ch_entry_review_system');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_entry_review_system = <ChTypeReviewSystem[]>servObj.data.ch_entry_review_system;

        return Promise.resolve(this.ch_entry_review_system);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_entry_review_system: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_entry_review_system');
    servObj.data = ch_entry_review_system;
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

  Update(ch_entry_review_system: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_entry_review_system', ch_entry_review_system.id);
    servObj.data = ch_entry_review_system;
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
    let servObj = new ServiceObject('ch_entry_review_system', id);
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
