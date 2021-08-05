import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreBusinessService {

  public scores: Score[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(id: number): Promise<Score[]> {
    var servObj = new ServiceObject("score/allByDelivery", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.scores = <Score[]>servObj.data.scores;
        return Promise.resolve(this.scores);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
