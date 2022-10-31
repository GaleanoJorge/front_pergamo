import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRecord } from '../models/ch-record';

@Injectable({
  providedIn: 'root'
})
export class ChRecordService {
  public ch_record: ChRecord[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRecord[]> {
    let servObj = new ServiceObject(params ? 'ch_record?pagination=false' : 'ch_record');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_record = <ChRecord[]>servObj.data.ch_record;

        return Promise.resolve(this.ch_record);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_record: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record');
    servObj.data = ch_record;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  SaveExtCon(ch_record: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record');
    servObj.data = ch_record;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  ViewHC(ch_record: any): any {
    let servObj = new ServiceObject('viewHC/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewCertification(ch_record: any): any {
    let servObj = new ServiceObject('viewCertification/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  ViewFormulation(ch_record: any): any {
    let servObj = new ServiceObject('viewFormulation/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  ViewMedicalOrder(ch_record: any): any {
    let servObj = new ServiceObject('viewMedicalOrder/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewInability(ch_record: any): any {
    let servObj = new ServiceObject('viewInability/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewCertificate(ch_record: any): any {
    let servObj = new ServiceObject('viewCertificate/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewInterconsultation(ch_record: any): any {
    let servObj = new ServiceObject('viewInterconsultation/'+ ch_record);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }


  ViewAllHC(params = {}): any {
    let servObj = new ServiceObject('viewAllHC');
    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        //this.ch_record = <any[]>servObj.data.ch_record;

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }


  Update(ch_record: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record', ch_record.id);
    servObj.data = ch_record;
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


  UpdateCH(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record/update', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_record', id);
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
