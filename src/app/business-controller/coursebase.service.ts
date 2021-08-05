import { Country } from '../models/country';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CourseBase } from '../models/coursebase';

@Injectable({
  providedIn: 'root'
})
export class CourseBaseService {
  public baseCourses: CourseBase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CourseBase[]> {
    let servObj = new ServiceObject('basecourses');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.baseCourses = <CourseBase[]>servObj.data.courses
        return Promise.resolve(this.baseCourses);

      })
      .catch(x => {
        throw x.message;
      })
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('basecourses');
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
      })
  }

  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('basecourses', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('basecourses', id);
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

  // Get(org: any): Promise<ServiceObject> {
  //   let servObj = new ServiceObject('category/categoryByOrigin', org.id);
  //   servObj.data = org;
  //   return this.webAPI.GetAction(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       return Promise.resolve(servObj);
  //     })
  //     .catch(x => {
  //       throw x.message;
  //     });
  // }

  GetByCategory(id: number): Promise<CourseBase[]> {
    let servObj = new ServiceObject('basecourses/courseByCategory', id);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.baseCourses = <CourseBase[]>servObj.data.course;

        return Promise.resolve(this.baseCourses);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
