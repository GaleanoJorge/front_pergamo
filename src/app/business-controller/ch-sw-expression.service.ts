import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwExpression } from '../models/ch-sw-expression';

@Injectable({
  providedIn: 'root'
})
export class ChSwExpressionService {
  public ch_sw_expression: ChSwExpression[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwExpression[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_expression?pagination=false' : 'ch_sw_expression');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_expression = <ChSwExpression[]>servObj.data.ch_sw_expression;

        return Promise.resolve(this.ch_sw_expression);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_expression: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_expression');
    servObj.data = ch_sw_expression;
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

  Update(ch_sw_expression: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_expression', ch_sw_expression.id);
    servObj.data = ch_sw_expression;
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
    let servObj = new ServiceObject('ch_sw_expression', id);
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
