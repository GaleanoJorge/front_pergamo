import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Frequency } from '../models/frequency';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {
  public frequency: Frequency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Frequency[]> {
    let servObj = new ServiceObject(params ? 'frequency?pagination=false' : 'frequency');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.frequency = <Frequency[]>servObj.data.frequency;

        return Promise.resolve(this.frequency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('frequency');
    servObj.data = frequency;
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

  Update(frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('frequency', frequency.id);
    servObj.data = frequency;
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
    let servObj = new ServiceObject('frequency', id);
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
