import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRstBiopsyGyneco } from '../models/ch-rst-biopsy-gyneco';

@Injectable({
  providedIn: 'root'
})
export class ChRstBiopsyGynecoService {
  public ch_rst_biopsy_gyneco: ChRstBiopsyGyneco[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRstBiopsyGyneco[]> {
    let servObj = new ServiceObject(params ? 'ch_rst_biopsy_gyneco?pagination=false' : 'ch_rst_biopsy_gyneco');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_rst_biopsy_gyneco = <ChRstBiopsyGyneco[]>servObj.data.ch_rst_biopsy_gyneco;

        return Promise.resolve(this.ch_rst_biopsy_gyneco);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_rst_biopsy_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rst_biopsy_gyneco');
    servObj.data = ch_rst_biopsy_gyneco;
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

  Update(ch_rst_biopsy_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rst_biopsy_gyneco', ch_rst_biopsy_gyneco.id);
    servObj.data = ch_rst_biopsy_gyneco;
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
    let servObj = new ServiceObject('ch_rst_biopsy_gyneco', id);
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
