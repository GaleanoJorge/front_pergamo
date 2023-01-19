import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PatientPosition } from '../models/patient-position';

@Injectable({
  providedIn: 'root'
})
export class PatientPositionService {
  public patient_position: PatientPosition[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PatientPosition[]> {
    let servObj = new ServiceObject(params ? 'patient_position?pagination=false' : 'patient_position');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patient_position = <PatientPosition[]>servObj.data.patient_position;

        return Promise.resolve(this.patient_position);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(patient_position: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('patient_position');
    servObj.data = patient_position;
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

  Update(patient_position: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('patient_position', patient_position.id);
    servObj.data = patient_position;
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
    let servObj = new ServiceObject('patient_position', id);
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
