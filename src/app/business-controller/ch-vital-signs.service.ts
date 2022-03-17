import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChVitalSigns } from '../models/ch-vital-signs';

@Injectable({
  providedIn: 'root'
})
export class ChVitalSignsService {
  public ChVitalSigns: ChVitalSigns[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChVitalSigns[]> {
    let servObj = new ServiceObject(params ? 'ch_vital_signs?pagination=false' : 'ch_vital_signs');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ChVitalSigns = <ChVitalSigns[]>servObj.data.ChVitalSigns;

        return Promise.resolve(this.ChVitalSigns);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ChVitalSigns: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_signs');
    servObj.data = ChVitalSigns;
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

  Update(ChVitalSigns: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_signs', ChVitalSigns.id);
    servObj.data = ChVitalSigns;
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
    let servObj = new ServiceObject('ch_vital_signs', id);
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
