import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NeighborhoodOrResidence } from '../models/neighborhood-or-residence';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodOrResidenceService {
  public neighborhood_or_residence: NeighborhoodOrResidence[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NeighborhoodOrResidence[]> {
    let servObj = new ServiceObject(params ? 'neighborhood_or_residence?pagination=false' : 'neighborhood_or_residence');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.neighborhood_or_residence = <NeighborhoodOrResidence[]>servObj.data.neighborhood_or_residence;

        return Promise.resolve(this.neighborhood_or_residence);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(neighborhood_or_residence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('neighborhood_or_residence');
    servObj.data = neighborhood_or_residence;
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

  Update(neighborhood_or_residence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('neighborhood_or_residence', neighborhood_or_residence.id);
    servObj.data = neighborhood_or_residence;
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
    let servObj = new ServiceObject('neighborhood_or_residence', id);
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
