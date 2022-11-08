import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { MedicalStatus } from '../models/medical_status';

@Injectable({
  providedIn: 'root'
})
export class MedicalStatusService {
  public medical_status: MedicalStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MedicalStatus[]> {
    let servObj = new ServiceObject(params ? 'medical_status?pagination=false' : 'medical_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_status = <MedicalStatus[]>servObj.data.medical_status;

        return Promise.resolve(this.medical_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(medical_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_status');
    servObj.data = medical_status;
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

  Update(medical_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_status', medical_status.id);
    servObj.data = medical_status;
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
