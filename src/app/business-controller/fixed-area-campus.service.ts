import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedAreaCampus } from '../models/fixed-area-campus';

@Injectable({
  providedIn: 'root'
})
export class FixedAreaCampusService {
  public fixed_area_campus: FixedAreaCampus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedAreaCampus[]> {
    let servObj = new ServiceObject(params ? 'fixed_area_campus?pagination=false' : 'fixed_area_campus');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_area_campus = <FixedAreaCampus[]>servObj.data.fixed_area_campus;

        return Promise.resolve(this.fixed_area_campus);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_area_campus: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_area_campus');
    servObj.data = fixed_area_campus;
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

  Update(fixed_area_campus: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_area_campus', fixed_area_campus.id);
    servObj.data = fixed_area_campus;
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
    let servObj = new ServiceObject('fixed_area_campus', id);
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
