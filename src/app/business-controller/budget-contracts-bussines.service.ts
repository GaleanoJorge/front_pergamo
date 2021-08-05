import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';


@Injectable({
  providedIn: 'root',
})
export class BudgetContractsBussinesService extends BaseBusinessService {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'contract', 'contracts', 'contract');
  }

  GetAuxiliarData() {
    let servObj = new ServiceObject('getContractAuxiliaryData');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetEvents(contract_id) {
    let servObj = new ServiceObject(`contract/${contract_id}/events`);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.events);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveEvents(contract_id, data) {
    let servObj = new ServiceObject(`contract/${contract_id}/updateEvents`);
    servObj.data = data;
    return this.webAPI.PatchAction(servObj)
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
