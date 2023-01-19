import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MedicalCitation } from '../models/medical-citation';

@Injectable({
  providedIn: 'root'
})
export class MedicalCitationService {
  public medical_citation: MedicalCitation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MedicalCitation[]> {
    let servObj = new ServiceObject(params ? 'medical_citation?pagination=false' : 'medical_citation');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_citation = <MedicalCitation[]>servObj.data.medical_citation;

        return Promise.resolve(this.medical_citation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetActiveMedicalCitation(params = {}): Promise<MedicalCitation[]> {
    let servObj = new ServiceObject(params ? 'medical_citation/active/0?pagination=false' : 'medical_citation/active/0');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.medical_citation = <MedicalCitation[]>servObj.data.medical_citation;

        return Promise.resolve(this.medical_citation);
      })
      .catch(x => {
        throw x.message;
      });
  }

   GetByPacient(user_id,pagination?) {
    let servObj = new ServiceObject(!pagination ? `medical_citation/ByPacient/${user_id}` : `medical_citation/ByPacient/${user_id}?pagination=false` );
    return  this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.medical_citation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByBriefcase(briefcase_id) {
    let servObj = new ServiceObject(`medical_citation/Briefcase/${briefcase_id}`);
    return  this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.medical_citation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(medical_citation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_citation');
    servObj.data = medical_citation;
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

  Update(medical_citation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('medical_citation', medical_citation.id);
    servObj.data = medical_citation;
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
    let servObj = new ServiceObject('medical_citation', id);
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
