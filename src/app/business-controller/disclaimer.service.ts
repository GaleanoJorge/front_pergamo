import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { Disclaimer } from '../models/disclaimer';

@Injectable({
  providedIn: 'root'
})
export class DisclaimerService {
  public disclaimer: Disclaimer[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Disclaimer[]> {
    let servObj = new ServiceObject(params ? 'disclaimer?pagination=false' : 'disclaimer');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.disclaimer = <Disclaimer[]>servObj.data.disclaimer;

        return Promise.resolve(this.disclaimer);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(disclaimer: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('disclaimer');
    servObj.data = disclaimer;
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

  Update(disclaimer: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('disclaimer', disclaimer.id);
    servObj.data = disclaimer;
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
    let servObj = new ServiceObject('disclaimer', id);
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
