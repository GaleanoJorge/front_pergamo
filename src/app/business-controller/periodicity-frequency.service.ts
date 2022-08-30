import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PeriodicityFrequency } from '../models/periodicity-frequency';

@Injectable({
  providedIn: 'root'
})
export class PeriodicityFrequencyService {
  public periodicity_frequency: PeriodicityFrequency[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PeriodicityFrequency[]> {
    let servObj = new ServiceObject(params ? 'periodicity_frequency?pagination=false' : 'periodicity_frequency');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.periodicity_frequency = <PeriodicityFrequency[]>servObj.data.periodicity_frequency;

        return Promise.resolve(this.periodicity_frequency);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(periodicity_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('periodicity_frequency');
    servObj.data = periodicity_frequency;
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

  Update(periodicity_frequency: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('periodicity_frequency', periodicity_frequency.id);
    servObj.data = periodicity_frequency;
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
    let servObj = new ServiceObject('periodicity_frequency', id);
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
