import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwTurn } from '../models/ch-sw-turn';

@Injectable({
  providedIn: 'root'
})
export class ChSwTurnService {
  public ch_sw_turn: ChSwTurn[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwTurn[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_turn?pagination=false' : 'ch_sw_turn');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_turn = <ChSwTurn[]>servObj.data.ch_sw_turn;

        return Promise.resolve(this.ch_sw_turn);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_turn: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_turn');
    servObj.data = ch_sw_turn;
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

  Update(ch_sw_turn: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_turn', ch_sw_turn.id);
    servObj.data = ch_sw_turn;
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
    let servObj = new ServiceObject('ch_sw_turn', id);
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
