import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChVitalTemperature } from '../models/ch-vital-temperature';

@Injectable({
  providedIn: 'root'
})
export class ChVitalTemperatureService {
  public ch_vital_temperature: ChVitalTemperature[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChVitalTemperature[]> {
    let servObj = new ServiceObject(params ? 'ch_vital_temperature?pagination=false' : 'ch_vital_temperature');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_vital_temperature = <ChVitalTemperature[]>servObj.data.ch_vital_temperature;

        return Promise.resolve(this.ch_vital_temperature);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_vital_temperature: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_temperature');
    servObj.data = ch_vital_temperature;
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

  Update(ch_vital_temperature: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_temperature', ch_vital_temperature.id);
    servObj.data = ch_vital_temperature;
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
    let servObj = new ServiceObject('ch_vital_temperature', id);
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
