import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { CifDiagnosisTl } from '../models/cif-diagnosis-tl';

@Injectable({
  providedIn: 'root'
})
export class CifDiagnosisTlService {
  public cif_diagnosis_tl: CifDiagnosisTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CifDiagnosisTl[]> {
    let servObj = new ServiceObject(params ? 'cif_diagnosis_tl?pagination=false' : 'cif_diagnosis_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.cif_diagnosis_tl = <CifDiagnosisTl[]>servObj.data.cif_diagnosis_tl;

        return Promise.resolve(this.cif_diagnosis_tl); 
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(cif_diagnosis_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('cif_diagnosis_tl');
    servObj.data = cif_diagnosis_tl;
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

  Update(cif_diagnosis_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('cif_diagnosis_tl', cif_diagnosis_tl.id);
    servObj.data = cif_diagnosis_tl;
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
    let servObj = new ServiceObject('cif_diagnosis_tl', id);
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
