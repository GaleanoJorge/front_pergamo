import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Bed } from '../models/bed';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  public bed: Bed[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Bed[]> {
    let servObj = new ServiceObject(params ? 'bed?pagination=false' : 'bed');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bed = <Bed[]>servObj.data.bed;

        return Promise.resolve(this.bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetBedByPavilion(pavilion_id, ambit, procedure = 0, params = {}): Promise<Bed[]> {
    let servObj = new ServiceObject(`bed/byPavilion/${pavilion_id}/${ambit}/${procedure}`);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bed = <Bed[]>servObj.data.bed;
        return Promise.resolve(this.bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetOfficeBycampus(params = {}): Promise<Bed[]> {
    let servObj = new ServiceObject(params ? 'office_by_campus?pagination=false' : 'office_by_campus');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bed = <Bed[]>servObj.data.bed;

        return Promise.resolve(this.bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetOfficeByPavilion(params = {}): Promise<Bed[]> {
    let servObj = new ServiceObject(params ? 'office_by_campus?pagination=false' : 'office_by_campus');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bed = <Bed[]>servObj.data.bed;

        return Promise.resolve(this.bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getBedsByCampus(campus_id): Promise<Bed[]> {
    let servObj = new ServiceObject(`bed/getBedsByCampus/${campus_id}`);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.bed = <Bed[]>servObj.data;
        return Promise.resolve(this.bed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(bed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bed');
    servObj.data = bed;
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

  Update(bed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('bed', bed.id);
    servObj.data = bed;
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
    let servObj = new ServiceObject('bed', id);
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

  getAvailableConsultories(data = {}): Promise<Bed[]> {
    let servObj = new ServiceObject('get_available_consultories');
    return this.webAPI.GetAction(servObj, data)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        let beds = <Bed[]>servObj.data.beds;

        return Promise.resolve(beds);
      })
      .catch(x => {
        throw x.message;
      });
  }

}
