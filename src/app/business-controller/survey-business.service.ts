import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {Survey} from '../models/survey';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class SurveyBusinessService extends BaseBusinessService<Survey> {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'survey', 'surveys', 'survey');
  }

  getID(table): Promise<any[]> {
    const servObj = new ServiceObject(table);
    return this.webAPI.GetAction(servObj)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(x => {
        throw x.status === 401 ? x.error.msg : x.message;
      });
  }

  postDetail(data): Promise<any[]> {
    const servObj = new ServiceObject(`survey_detail`);
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(x => {
        throw x.status === 401 ? x.error.msg : x.message;
      });
  }

  Update(data: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject(this.entity, id ? id : data.id);
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  getAllByUser(path: any, data: any): Promise<any> {
    const servObj = new ServiceObject(path);
    servObj.data = data;
    return this.webAPI.GetAction(servObj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetResume(params = {}) {
    let servObj = new ServiceObject('surveySummary');
    return this.webAPI.GetAction(servObj, params)
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

  PieStatistics(params) {
    let servObj = new ServiceObject('pieSummary');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.pieSummary);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
