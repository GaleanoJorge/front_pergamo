import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { StudyLevelStatus } from '../models/study_level_status';

@Injectable({
  providedIn: 'root'
})
export class StudyLevelStatusService {
  public study_level_status: StudyLevelStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<StudyLevelStatus[]> {
    let servObj = new ServiceObject(params ? 'study_level_status?pagination=false' : 'study_level_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.study_level_status = <StudyLevelStatus[]>servObj.data.study_level_status;

        return Promise.resolve(this.study_level_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(study_level_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('study_level_status');
    servObj.data = study_level_status;
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

  Update(study_level_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('study_level_status', study_level_status.id);
    servObj.data = study_level_status;
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
    let servObj = new ServiceObject('study_level_status', id);
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
