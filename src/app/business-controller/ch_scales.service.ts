import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChScales } from '../models/ch-scales';


@Injectable({
  providedIn: 'root'
})
export class ChScalesService {
  public ch_scales: ChScales[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChScales[]> {
    let servObj = new ServiceObject(params ? 'ch_scales?pagination=false' : 'ch_scales');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_scales = <ChScales[]>servObj.data.ch_scales;

        return Promise.resolve(this.ch_scales);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveNorton(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleNorton');
    servObj.data = ch_scales;
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

  SaveGlasgow(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleGlasgow');
    servObj.data = ch_scales;
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

  SaveBarthel(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleBarthel');
    servObj.data = ch_scales;
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
  
  SavePayette(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScalePayette');
    servObj.data = ch_scales;
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
  
  Update(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scales', ch_scales.id);
    servObj.data = ch_scales;
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
    let servObj = new ServiceObject('ch_scales', id);
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
