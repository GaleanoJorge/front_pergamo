import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {CourseApproval} from '../models/course-approval';
import {WebAPIService} from '../services/web-api.service';
import {SessionBusinessService} from './session-business.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseApprovalBusinessService {

  public courseApproval: CourseApproval[] = [];

  constructor(private webAPI: WebAPIService, private sessionBS: SessionBusinessService) {
  }

  GetCollection(sect: any, id = null): Promise<CourseApproval[]> {
    let servObj = new ServiceObject('courseApproval/ApprovalByCourse',(sect.id ? sect.id : id));

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.courseApproval = <CourseApproval[]>servObj.data.courseApproval;

        return Promise.resolve(this.courseApproval);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('courseApproval');
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

  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('courseApproval', (sect.id ? sect.id : id));
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
    let servObj = new ServiceObject('courseApproval', id);
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
