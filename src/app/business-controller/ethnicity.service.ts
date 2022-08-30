import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Ethnicity } from '../models/ethnicity';

@Injectable({
  providedIn: 'root'
})
export class EthnicityService {
  public Ethnicity: Ethnicity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Ethnicity[]> {
    let servObj = new ServiceObject(params ? 'ethnicity?pagination=false' : 'ethnicity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.Ethnicity = <Ethnicity[]>servObj.data.Ethnicity;

        return Promise.resolve(this.Ethnicity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(Ethnicity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ethnicity');
    servObj.data = Ethnicity;
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

  Update(Ethnicity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ethnicity', Ethnicity.id);
    servObj.data = Ethnicity;
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
    let servObj = new ServiceObject('ethnicity', id);
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
