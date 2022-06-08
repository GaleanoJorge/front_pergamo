import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MeasurementUnits } from '../models/measurement-units';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitsService {
  public measurement_units: MeasurementUnits[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MeasurementUnits[]> {
    let servObj = new ServiceObject(params ? 'measurement_units?pagination=false' : 'measurement_units');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.measurement_units = <MeasurementUnits[]>servObj.data.measurement_units;

        return Promise.resolve(this.measurement_units);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(measurement_units: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('measurement_units');
    servObj.data = measurement_units;
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

  Update(measurement_units: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('measurement_units', measurement_units.id);
    servObj.data = measurement_units;
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
    let servObj = new ServiceObject('measurement_units', id);
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
