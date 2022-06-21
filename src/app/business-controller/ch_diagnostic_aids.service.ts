import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChDiagnosticAids } from '../models/ch-diagnostic-aids';
@Injectable({
  providedIn: 'root'
})
export class ChDiagnosticAidsService {
  public ch_diagnostic_aids:ChDiagnosticAids[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChDiagnosticAids[]> {
    let servObj = new ServiceObject(params ? 'ch_diagnostic_aids?pagination=false' : 'ch_diagnostic_aids');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diagnostic_aids = <ChDiagnosticAids[]>servObj.data.ch_diagnostic_aids;

        return Promise.resolve(this.ch_diagnostic_aids);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_diagnostic_aids: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnostic_aids');
    servObj.data = ch_diagnostic_aids;
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

  Update(ch_diagnostic_aids: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnostic_aids', ch_diagnostic_aids.id);
    servObj.data = ch_diagnostic_aids;
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
    let servObj = new ServiceObject('ch_diagnostic_aids', id);
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
