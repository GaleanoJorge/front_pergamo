import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChMedicalCertificate } from '../models/ch-medical-certificate';

@Injectable({
  providedIn: 'root'
})
export class ChMedicalCertificateService {
  public ch_medical_certificate: ChMedicalCertificate[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChMedicalCertificate[]> {
    let servObj = new ServiceObject(params ? 'ch_medical_certificate?pagination=false' : 'ch_medical_certificate');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_medical_certificate = <ChMedicalCertificate[]>servObj.data.ch_medical_certificate;

        return Promise.resolve(this.ch_medical_certificate);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_medical_certificate: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_medical_certificate');
    servObj.data = ch_medical_certificate;
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

  Update(ch_medical_certificate: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_medical_certificate', ch_medical_certificate.id);
    servObj.data = ch_medical_certificate;
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
    let servObj = new ServiceObject('ch_medical_certificate', id);
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
