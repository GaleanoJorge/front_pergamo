import { Injectable } from '@angular/core';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { SessionBusinessService } from './session-business.service';
import { HttpParams } from '@angular/common/http';
import { CourseCompetition } from '../models/course-competition';

@Injectable({
  providedIn: 'root'
})
export class CourseCompetitionBusinessService {

  public courseCompetition: any[] = [];

  constructor(private webAPI: WebAPIService, private sessionBS: SessionBusinessService) {
  }

  GetByCourseId(id: number): Promise<any> {
    var servObj = new ServiceObject("coursecompetition");
    var paramsMain = new HttpParams().set("course_id", id.toString());
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        // this.courseModules = <any>servObj.data.modules;
        return Promise.resolve(x);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('coursecompetition');
    servObj.data = sect;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('coursecompetition', id);
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
