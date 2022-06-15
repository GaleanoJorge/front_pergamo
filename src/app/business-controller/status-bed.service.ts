import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { StatusBed } from '../models/status-bed';

@Injectable({
  providedIn: 'root'
})
export class StatusBedService {
  public status_bed: StatusBed[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<StatusBed[]> {
    let servObj = new ServiceObject(params ? 'status_bed?pagination=false' : 'status_bed');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.status_bed = <StatusBed[]>servObj.data.status_bed;

        return Promise.resolve(this.status_bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(status_bed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('status_bed');
    servObj.data = status_bed;
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

  Update(status_bed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('status_bed', status_bed.id);
    servObj.data = status_bed;
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
    let servObj = new ServiceObject('status_bed', id);
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
