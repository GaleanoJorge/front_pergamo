import { Country } from '../models/country';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CourseBase } from '../models/coursebase';
import { Campus } from '../models/campus';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  public campus: Campus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Campus[]> {
    let servObj = new ServiceObject(params ? 'campus?pagination=false' : 'campus');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.campus = <Campus[]>servObj.data.campus;

        return Promise.resolve(this.campus);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
