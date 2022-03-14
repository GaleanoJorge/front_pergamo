import { Country } from '../models/country';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CourseBase } from '../models/coursebase';
import { PacMonitoring } from '../models/pac-monitoring';

@Injectable({
  providedIn: 'root'
})
export class PacMonitoringService {
  public pac_monitoring: PacMonitoring[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PacMonitoring[]> {
    let servObj = new ServiceObject(params ? 'PacMonitoring?pagination=false' : 'PacMonitoring');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pac_monitoring = <PacMonitoring[]>servObj.data.campus;

        return Promise.resolve(this.pac_monitoring);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pac_monitoring: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacMonitoring');
    servObj.data = pac_monitoring;
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

  Update(pac_monitoring: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacMonitoring', pac_monitoring.id);
    servObj.data = pac_monitoring;
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
    let servObj = new ServiceObject('PacMonitoring', id);
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
