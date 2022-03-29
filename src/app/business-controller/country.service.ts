import {Country} from '../models/country';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public country: Country[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(): Promise<Country[]> {
    let servObj = new ServiceObject('country');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.country = <Country[]>servObj.data.countrys;

        return Promise.resolve(this.country);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reg: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('country');
    servObj.data = reg;
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

  Update(reg: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('country', reg.id);
    servObj.data = reg;
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
    let servObj = new ServiceObject('country', id);
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
