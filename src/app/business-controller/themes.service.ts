import {Themes} from '../models/themes';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
 public themes: Themes[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Themes[]> {
    let servObj = new ServiceObject('themes');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.themes = <Themes[]>servObj.data.themes;

        return Promise.resolve(this.themes);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('themes');
    servObj.data = sub;
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

  Update(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('themes', sub.id);
    servObj.data = sub;
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
    let servObj = new ServiceObject('themes', id);
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
