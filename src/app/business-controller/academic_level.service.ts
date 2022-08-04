import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { AcademicLevel } from '../models/academic_level';

@Injectable({
  providedIn: 'root'
})
export class AcademicLevelService {
  public academicLevel: AcademicLevel[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AcademicLevel[]> {
    let servObj = new ServiceObject(params ? 'academicLevel?pagination=false' : 'academicLevel');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.academicLevel = <AcademicLevel[]>servObj.data.academicLevel;

        return Promise.resolve(this.academicLevel);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(academicLevel: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('academicLevel');
    servObj.data = academicLevel;
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

  Update(academicLevel: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('academicLevel', academicLevel.id);
    servObj.data = academicLevel;
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
    let servObj = new ServiceObject('academicLevel', id);
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
