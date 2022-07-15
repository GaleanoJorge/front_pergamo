import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChEMSAcuityOT } from '../models/ch_e_m_s_acuity_o_t';


@Injectable({
  providedIn: 'root'
})
export class ChEMSAcuityOTService {
  public ch_e_m_s_acuity_o_t: ChEMSAcuityOT[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChEMSAcuityOT[]> {
    let servObj = new ServiceObject(params ? 'ch_e_m_s_acuity_o_t?pagination=false' : 'ch_e_m_s_acuity_o_t');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_e_m_s_acuity_o_t = <ChEMSAcuityOT[]>servObj.data.ch_e_m_s_acuity_o_t;

        return Promise.resolve(this.ch_e_m_s_acuity_o_t);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_e_m_s_acuity_o_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_e_m_s_acuity_o_t');
    servObj.data = ch_e_m_s_acuity_o_t;
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

  Update(ch_e_m_s_acuity_o_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_e_m_s_acuity_o_t', ch_e_m_s_acuity_o_t.id);
    servObj.data = ch_e_m_s_acuity_o_t;
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
    let servObj = new ServiceObject('ch_e_m_s_acuity_o_t', id);
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
