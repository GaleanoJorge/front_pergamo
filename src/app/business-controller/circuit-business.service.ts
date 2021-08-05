import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {Circuit} from '../models/circuit';

@Injectable({
  providedIn: 'root',
})
export class CircuitBusinessService {
  public circuit: Circuit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Circuit[]> {
    let servObj = new ServiceObject('circuit');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.circuit = <Circuit[]>servObj.data.circuits;

        return Promise.resolve(this.circuit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPublicCollection(params = {}): Promise<Circuit[]> {
    let servObj = new ServiceObject('public/circuit');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.circuit = <Circuit[]>servObj.data.circuits;

        return Promise.resolve(this.circuit);
      })
      .catch(x => {
        throw x.message;
      });
  }

}

