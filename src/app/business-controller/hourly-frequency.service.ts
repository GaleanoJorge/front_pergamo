import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HourlyFrequency } from '../models/hourly-frequency';

@Injectable({
  providedIn: 'root'
})
export class HourlyFrequencyService {
  public hourly_frequency: HourlyFrequency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<HourlyFrequency[]> {
    let servObj = new ServiceObject(params ? 'hourly_frequency?pagination=false' : 'hourly_frequency');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.hourly_frequency = <HourlyFrequency[]>servObj.data.hourly_frequency;

        return Promise.resolve(this.hourly_frequency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(hourly_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('hourly_frequency');
    servObj.data = hourly_frequency;
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

  Update(hourly_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('hourly_frequency', hourly_frequency.id);
    servObj.data = hourly_frequency;
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
    let servObj = new ServiceObject('hourly_frequency', id);
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
