import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedLocationCampus } from '../models/fixed-location-campus';

@Injectable({
  providedIn: 'root'
})
export class FixedLocationCampusService {
  public fixed_location_campus: FixedLocationCampus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedLocationCampus[]> {
    let servObj = new ServiceObject(params ? 'fixed_location_campus?pagination=false' : 'fixed_location_campus');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_location_campus = <FixedLocationCampus[]>servObj.data.fixed_location_campus;

        return Promise.resolve(this.fixed_location_campus);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_location_campus: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_location_campus');
    servObj.data = fixed_location_campus;
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

  Update(fixed_location_campus: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_location_campus', fixed_location_campus.id);
    servObj.data = fixed_location_campus;
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
    let servObj = new ServiceObject('fixed_location_campus', id);
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
