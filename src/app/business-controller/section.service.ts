import {Section} from '../models/section';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {BaseBusinessService} from './base-business.service';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends BaseBusinessService {
  public answerT: Section[] = [];

  constructor(private webAPI: WebAPIService) {
    super(webAPI, 'section', 'sections', 'section');
  }

  GetCollection(): Promise<Section[]> {
    let servObj = new ServiceObject('section');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.answerT = <Section[]>servObj.data.sections;

        return Promise.resolve(this.answerT);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sec: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('section');
    servObj.data = sec;
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

  Update(sec: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('section', sec.id);
    servObj.data = sec;
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
    let servObj = new ServiceObject('section', id);
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
