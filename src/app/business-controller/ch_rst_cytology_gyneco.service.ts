import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRstCytologyGyneco } from '../models/ch-rst-cytology-gyneco';

@Injectable({
  providedIn: 'root'
})
export class ChRstCytologyGynecoService {
  public ch_rst_cytology_gyneco: ChRstCytologyGyneco[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRstCytologyGyneco[]> {
    let servObj = new ServiceObject(params ? 'ch_rst_cytology_gyneco?pagination=false' : 'ch_rst_cytology_gyneco');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_rst_cytology_gyneco = <ChRstCytologyGyneco[]>servObj.data.ch_rst_cytology_gyneco;

        return Promise.resolve(this.ch_rst_cytology_gyneco);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_rst_cytology_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rst_cytology_gyneco');
    servObj.data = ch_rst_cytology_gyneco;
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

  Update(ch_rst_cytology_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rst_cytology_gyneco', ch_rst_cytology_gyneco.id);
    servObj.data = ch_rst_cytology_gyneco;
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
    let servObj = new ServiceObject('ch_rst_cytology_gyneco', id);
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
