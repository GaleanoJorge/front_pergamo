import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { LocationCapacity } from '../models/location-capacity';

@Injectable({
  providedIn: 'root'
})
export class LocationCapacityService {
  public location_capacity: LocationCapacity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<LocationCapacity[]> {
    let servObj = new ServiceObject(params ? 'location_capacity?pagination=false' : 'location_capacity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.location_capacity = <LocationCapacity[]>servObj.data.location_capacity;

        return Promise.resolve(this.location_capacity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  async GetByAssistance(assistance_id) {
    let servObj = new ServiceObject(`location_capacity/AssistanceByLocation/${assistance_id}`);
    return await this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.location_capacity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(location_capacity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('location_capacity');
    servObj.data = location_capacity;
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

  renovateLocationCapacity(campus_id: number, location_capacity: any = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('location_capacity/renovateLocationCapacity/' + campus_id);
    servObj.data = location_capacity;
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

  Update(location_capacity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('location_capacity', location_capacity.id);
    servObj.data = location_capacity;
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
    let servObj = new ServiceObject('location_capacity', id);
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
