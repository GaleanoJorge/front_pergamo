import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsEpisodes } from '../models/ch-ps-episodes';

@Injectable({
  providedIn: 'root'
})
export class ChPsEpisodesService {
  public ch_ps_episodes: ChPsEpisodes[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsEpisodes[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_episodes?pagination=false' : 'ch_ps_episodes');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_episodes = <ChPsEpisodes[]>servObj.data.ch_ps_episodes;

        return Promise.resolve(this.ch_ps_episodes);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_episodes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_episodes');
    servObj.data = ch_ps_episodes;
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

  Update(ch_ps_episodes: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_episodes', ch_ps_episodes.id);
    servObj.data = ch_ps_episodes;
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
    let servObj = new ServiceObject('ch_ps_episodes', id);
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
