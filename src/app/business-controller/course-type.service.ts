import { CourseType } from '../models/course-type';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  public course_type: CourseType[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<CourseType[]> {
    let servObj = new ServiceObject(params ? 'course_type?pagination=false' : 'course_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.course_type = <CourseType[]>servObj.data.course_type;

        return Promise.resolve(this.course_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(course_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('course_type');
    servObj.data = course_type;
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

  Update(course_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('course_type', course_type.id);
    servObj.data = course_type;
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
    let servObj = new ServiceObject('course_type', id);
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
