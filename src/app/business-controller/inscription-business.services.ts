import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {UserRoleCategoryInscription} from '../models/user-role-category-inscription';

@Injectable({
  providedIn: 'root',
})
export class InscriptionBusinessServices {

  public categoryInscriptions: UserRoleCategoryInscription[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  QualifyTeacher(data): Promise<ServiceObject> {
    let servObj = new ServiceObject('trainersNetwork', data.id);
    servObj.data = data;
    return this.webAPI.PutAction(servObj)
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

  QualifyStudent(data) {
    let servObj = new ServiceObject('userRoleCourse', data.id);
    servObj.data = data;
    return this.webAPI.PutAction(servObj)
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

  GetAllInscriptionsBy(id) {
    var servObj = new ServiceObject("get_students_by_course", id);
    return this.webAPI.GetAction(servObj)
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
}
