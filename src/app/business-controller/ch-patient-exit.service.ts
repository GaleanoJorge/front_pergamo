import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPatientExit } from '../models/ch-patient-exit';

@Injectable({
  providedIn: 'root'
})
export class ChPatientExitService {
  public ch_patient_exit: ChPatientExit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPatientExit[]> {
    let servObj = new ServiceObject(params ? 'ch_patient_exit?pagination=false' : 'ch_patient_exit');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_patient_exit = <ChPatientExit[]>servObj.data.ch_patient_exit;

        return Promise.resolve(this.ch_patient_exit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_patient_exit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_patient_exit');
    servObj.data = ch_patient_exit;
    return this.webAPI.PostAction(servObj)
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

  Update(ch_patient_exit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_patient_exit', ch_patient_exit.id);
    servObj.data = ch_patient_exit;
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
    let servObj = new ServiceObject('ch_patient_exit', id);
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
