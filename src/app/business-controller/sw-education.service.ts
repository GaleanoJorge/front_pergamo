import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { SwEducation } from '../models/sw-education';

@Injectable({
  providedIn: 'root'
})
export class SwEducationService {
  public sw_education: SwEducation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SwEducation[]> {
    let servObj = new ServiceObject(params ? 'sw_education?pagination=false' : 'sw_education');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.sw_education = <SwEducation[]>servObj.data.sw_education;

        return Promise.resolve(this.sw_education);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sw_education: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('sw_education');
    servObj.data = sw_education;
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

  Update(sw_education: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('sw_education', sw_education.id);
    servObj.data = sw_education;
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
    let servObj = new ServiceObject('sw_education', id);
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
