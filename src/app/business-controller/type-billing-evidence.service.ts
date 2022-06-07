import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeBillingEvidence } from '../models/type-billing-evidence';

@Injectable({
  providedIn: 'root'
})
export class TypeBillingEvidenceService {
  public type_billing_evidence: TypeBillingEvidence[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeBillingEvidence[]> {
    let servObj = new ServiceObject(params ? 'type_billing_evidence?pagination=false' : 'type_billing_evidence');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_billing_evidence = <TypeBillingEvidence[]>servObj.data.type_billing_evidence;

        return Promise.resolve(this.type_billing_evidence);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_billing_evidence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_billing_evidence');
    servObj.data = type_billing_evidence;
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

  Update(type_billing_evidence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_billing_evidence', type_billing_evidence.id);
    servObj.data = type_billing_evidence;
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
    let servObj = new ServiceObject('type_billing_evidence', id);
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
