import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PopulationGroup } from '../models/population-group';

@Injectable({
  providedIn: 'root'
})
export class PopulationGroupService {
  public population_group: PopulationGroup[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PopulationGroup[]> {
    let servObj = new ServiceObject(params ? 'population_group?pagination=false' : 'population_group');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.population_group = <PopulationGroup[]>servObj.data.population_group;

        return Promise.resolve(this.population_group);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(population_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('population_group');
    servObj.data = population_group;
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

  Update(population_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('population_group', population_group.id);
    servObj.data = population_group;
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
    let servObj = new ServiceObject('population_group', id);
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
