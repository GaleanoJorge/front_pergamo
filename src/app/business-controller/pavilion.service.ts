import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Pavilion } from '../models/pavilion';

@Injectable({
  providedIn: 'root'
})
export class PavilionService {
  public pavilion: Pavilion[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Pavilion[]> {
    let servObj = new ServiceObject(params ? 'pavilion?pagination=false' : 'pavilion');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pavilion = <Pavilion[]>servObj.data.pavilion;

        return Promise.resolve(this.pavilion);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPavilionByFlat(flat_id): Promise<Pavilion[]> {
    let servObj = new ServiceObject('pavilion/byFlat',flat_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pavilion = <Pavilion[]>servObj.data.pavilion;
        return Promise.resolve(this.pavilion);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pavilion: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pavilion');
    servObj.data = pavilion;
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

  Update(pavilion: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pavilion', pavilion.id);
    servObj.data = pavilion;
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
    let servObj = new ServiceObject('pavilion', id);
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
