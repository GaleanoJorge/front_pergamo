import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { MedicalDiaryDays } from '../models/medical_diary_days'; 

@Injectable({
  providedIn: 'root'
})
export class MedicalDiaryDaysService {
  public medical_diary_days: MedicalDiaryDays[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MedicalDiaryDays[]> {
    let servObj = new ServiceObject(params ? 'medical_diary_days?pagination=false' : 'medical_diary_days');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_diary_days = <MedicalDiaryDays[]>servObj.data.medical_diary_days;

        return Promise.resolve(this.medical_diary_days);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetOne(medicalDiaryDays_id: number): Promise<MedicalDiaryDays[]> {
    let servObj = new ServiceObject(`medical_diary_days/${medicalDiaryDays_id}`);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_diary_days = <MedicalDiaryDays[]>servObj.data.medical_diary_days;

        return Promise.resolve(this.medical_diary_days);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(medical_diary_days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary_days');
    servObj.data = medical_diary_days;
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

  GeneratePdf(params: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary_days/generateCashReceiptPDF/'+params.id);
    servObj.data = params;
    return this.webAPI.GetAction(servObj, params)
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

  ChangeStatus(id, medical_diary_days: any): Promise<any> {
    let servObj = new ServiceObject(`medical_diary_days/${id}/changeStatus`);
    servObj.data = medical_diary_days;
    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  Update(medical_diary_days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary_days', medical_diary_days.id);
    servObj.data = medical_diary_days;
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
    let servObj = new ServiceObject('medical_diary_days', id);
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

  Transfer(transferData): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary_days/transfer');
    servObj.data = transferData;
    console.log(servObj.data);
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


}
