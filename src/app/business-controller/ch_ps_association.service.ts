import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsAssociation } from '../models/ch-ps-association';

@Injectable({
  providedIn: 'root'
})
export class ChPsAssociationService {
  public ch_ps_association: ChPsAssociation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAssociation[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_association?pagination=false' : 'ch_ps_association');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_association = <ChPsAssociation[]>servObj.data.ch_ps_association;

        return Promise.resolve(this.ch_ps_association);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_association: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_association');
    servObj.data = ch_ps_association;
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

  Update(ch_ps_association: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_association', ch_ps_association.id);
    servObj.data = ch_ps_association;
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
    let servObj = new ServiceObject('ch_ps_association', id);
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
