import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CiiuDivision } from '../models/ciiu-division';

@Injectable({
  providedIn: 'root'
})
export class CiiuDivisionService {
  public ciiu_division: CiiuDivision[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CiiuDivision[]> {
    let servObj = new ServiceObject(params ? 'ciiu_division?pagination=false' : 'ciiu_division');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ciiu_division = <CiiuDivision[]>servObj.data.ciiu_division;

        return Promise.resolve(this.ciiu_division);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ciiu_division: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_division');
    servObj.data = ciiu_division;
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

  Update(ciiu_division: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_division', ciiu_division.id);
    servObj.data = ciiu_division;
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
    let servObj = new ServiceObject('ciiu_division', id);
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
