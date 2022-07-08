import { Injectable } from '@angular/core';
import { AcademicLevel } from '../models/academic_level';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class AcademicLevelBusinessService {

  public academicLevels: AcademicLevel[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<AcademicLevel[]> {
    var servObj = new ServiceObject("academicLevel");
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.academicLevels = <AcademicLevel[]>servObj.data.academicLevel;
        return Promise.resolve(this.academicLevels);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
