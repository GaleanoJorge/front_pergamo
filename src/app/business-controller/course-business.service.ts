import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { UserCourse } from '../models/user-course';
import { CustomField } from '../models/custom-field';
import { CourseEducationalInstitution } from '../models/course-educational-institution';
import { UserRoleCourse } from '../models/user-role-course';

@Injectable({
  providedIn: 'root'
})
export class CourseBusinessService {

  public courses: Course[] = [];
  public userRoleCourseList: UserRoleCourse[] = [];
  public courseInstitutions: CourseEducationalInstitution[] = [];
  public userRoleCourse: UserCourse[] = [];

  constructor(private webAPI: WebAPIService) {
    this.courses = [];
    this.userRoleCourse = [];
  }

  GetCollection(id: number): Promise<Course[]> {
    var servObj = new ServiceObject("course/allByCategory", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courses = <Course[]>servObj.data.courses;
        return Promise.resolve(this.courses);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetSingle(id: number): Promise<UserCourse[]> {
    var servObj = new ServiceObject("course/userRoleByCourse", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.userRoleCourse = <UserCourse[]>servObj.data.userRoleCourse;
        return Promise.resolve(this.userRoleCourse);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetCustomFields(id: number): Promise<any[]> {
    var customField: CustomField;
    var servObj = new ServiceObject("customField/allByCourse", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any[]>servObj.data.customFieldCourse);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetEducationalInstitution(id: number): Promise<CourseEducationalInstitution[]> {
    var servObj = new ServiceObject("course/EducationalInstitution", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courseInstitutions = <CourseEducationalInstitution[]>servObj.data.institutions;
        return Promise.resolve(this.courseInstitutions);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetStructure(id: number): Promise<Course[]> {
    var servObj = new ServiceObject("course/structure", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courses = <Course[]>servObj.data.course;
        return Promise.resolve(this.courses);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetGroup(group: number): Promise<UserRoleCourse[]> {
    var servObj = new ServiceObject("course/groupDelivery/" + group);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.userRoleCourseList = <UserRoleCourse[]>servObj.data.group;
        return Promise.resolve(this.userRoleCourseList);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetFormInscripcion() {
    let servObj = new ServiceObject('public/course/forInscripcion');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data);
      })
      .catch(x => {
        throw x.status === 401 ? x.error.msg : x.message;
      });
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('courses');
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

  Update(course: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('courses', course.id);
    servObj.data = course;
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
    let servObj = new ServiceObject('courses', id);
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

  GetById(id: number): Promise<Course> {
    let servObj = new ServiceObject('courses', id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courses = <Course[]>servObj.data.course;
        return Promise.resolve(this.courses[0]);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetAll(params = {}): Promise<Course[]> {
    let servObj = new ServiceObject('courses');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courses = <Course[]>servObj.data.courses;
        return Promise.resolve(this.courses);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetStatus(): Promise<any[]> {
    let servObj = new ServiceObject('course_states?pagination=false');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any[]>servObj.data.course_states);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
