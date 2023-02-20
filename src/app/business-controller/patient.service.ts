import { Themes } from '../models/themes';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public patients: Patient[] = [];
  public patient: Patient;

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Patient[]> {
    let servObj = new ServiceObject('patient');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.patients = <Patient[]>servObj.data.patients;

        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPatientByIdentification(identification: number): Promise<Patient[]> {
    // console.log(identification);
    var servObj = new ServiceObject("patient/GetPatientByIdentification", identification);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patients = <Patient[]>servObj.data.patients;
        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPatientsWitnLaboratories(params = {}): Promise<Patient[]> {
    // console.log(identification);
    let servObj = new ServiceObject(params ? 'GetPatientsWithLaboratory?pagination=false' : 'GetPatientsWithLaboratory');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patients = <Patient[]>servObj.data.patients;
        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByAdmission(identification: {}): Promise<Patient[]> {
    // console.log(identification);
    var servObj = new ServiceObject("user/byAdmission/2");
    return this.webAPI.GetAction(servObj, identification)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patients = <Patient[]>servObj.data.patients;
        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SavePacient(patient: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacientInscription');
    servObj.data = patient;
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

  GetUserById(id): Promise<Patient> {
    var servObj = new ServiceObject("patient", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patient = <Patient>servObj.data.patients[0];
        return Promise.resolve(this.patient);
      })
      .catch(x => {
        throw x.message;
      });
  }

  PatientByPad(id: any, params = {}): Promise<Patient[]> {
    var servObj = new ServiceObject("patient/byPAD/2", id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patients = <Patient[]>servObj.data;
        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  PatientByPah(id: any, params = {}): Promise<Patient[]> {
    var servObj = new ServiceObject("patient/byPAH/2", id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.patients = <Patient[]>servObj.data;
        return Promise.resolve(this.patients);
      })
      .catch(x => {
        throw x.message;
      });
  }

  UpdatePatient(patient: any, id?): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacientInscription', (patient.id ? patient.id : id));
    servObj.data = patient;
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
  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('themes');
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

  Update(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('themes', sub.id);
    servObj.data = sub;
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
    let servObj = new ServiceObject('themes', id);
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
