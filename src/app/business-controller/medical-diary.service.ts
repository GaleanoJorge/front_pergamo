import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MedicalDiary } from '../models/medical-diary';

@Injectable({
  providedIn: 'root'
})
export class MedicalDiaryService {
  public medical_diary: MedicalDiary[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MedicalDiary[]> {
    let servObj = new ServiceObject(params ? 'medical_diary?pagination=false' : 'medical_diary');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_diary = <MedicalDiary[]>servObj.data.medical_diary;

        return Promise.resolve(this.medical_diary);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetActiveMedicalDiary(params = {}): Promise<MedicalDiary[]> {
    let servObj = new ServiceObject(params ? 'medical_diary/active/0?pagination=false' : 'medical_diary/active/0');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_diary = <MedicalDiary[]>servObj.data.medical_diary;

        return Promise.resolve(this.medical_diary);
      })
      .catch(x => {
        throw x.message;
      });
  }

   GetByPacient(user_id,pagination?) {
    let servObj = new ServiceObject(!pagination ? `medical_diary/ByPacient/${user_id}` : `medical_diary/ByPacient/${user_id}?pagination=false` );
    return  this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.medical_diary);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByBriefcase(briefcase_id) {
    let servObj = new ServiceObject(`medical_diary/Briefcase/${briefcase_id}`);
    return  this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.medical_diary);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(medical_diary: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary');
    servObj.data = medical_diary;
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

  Update(medical_diary: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_diary', medical_diary.id);
    servObj.data = medical_diary;
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
    let servObj = new ServiceObject('medical_diary', id);
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
