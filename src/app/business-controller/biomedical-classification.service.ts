import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BiomedicalClassification } from '../models/biomedical-classification';

@Injectable({
  providedIn: 'root'
})
export class BiomedicalClassificationService {
  public biomedical_classification: BiomedicalClassification[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BiomedicalClassification[]> {
    let servObj = new ServiceObject(params ? 'biomedical_classification?pagination=false' : 'biomedical_classification');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.biomedical_classification = <BiomedicalClassification[]>servObj.data.biomedical_classification;

        return Promise.resolve(this.biomedical_classification);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(biomedical_classification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('biomedical_classification');
    servObj.data = biomedical_classification;
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

  Update(biomedical_classification: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('biomedical_classification', biomedical_classification.id);
    servObj.data = biomedical_classification;
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
    let servObj = new ServiceObject('biomedical_classification', id);
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
