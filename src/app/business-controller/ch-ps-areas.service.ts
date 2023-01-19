import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsAreas } from '../models/ch-ps-areas';

@Injectable({
  providedIn: 'root'
})
export class ChPsAreasService {
  public ch_ps_areas: ChPsAreas[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAreas[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_areas?pagination=false' : 'ch_ps_areas');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_areas = <ChPsAreas[]>servObj.data.ch_ps_areas;

        return Promise.resolve(this.ch_ps_areas);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_areas: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_areas');
    servObj.data = ch_ps_areas;
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

  Update(ch_ps_areas: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_areas', ch_ps_areas.id);
    servObj.data = ch_ps_areas;
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
    let servObj = new ServiceObject('ch_ps_areas', id);
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
