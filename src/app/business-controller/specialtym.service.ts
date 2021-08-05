import {Specialty} from '../models/specialty';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialtymService {
  public specialty: Specialty[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Specialty[]> {
    let servObj = new ServiceObject('specialtym');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.specialty = <Specialty[]>servObj.data.specialtym;

        return Promise.resolve(this.specialty);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('specialtym');
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        return x.message;
      });
  }

  Update(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('specialtym', sect.id);
    servObj.data = sect;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('specialtym', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message
      });
  }
}
