import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FileContract } from '../models/file-contract';

@Injectable({
  providedIn: 'root'
})
export class FileContractService {
  public file_contract: FileContract[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FileContract[]> {
    let servObj = new ServiceObject(params ? 'file_contract?pagination=false' : 'file_contract');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.file_contract = <FileContract[]>servObj.data.file_contract;

        return Promise.resolve(this.file_contract);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(file_contract: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('file_contract');
    servObj.data = file_contract;
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


  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('file_contract', (sect.id ? sect.id : id));
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
    let servObj = new ServiceObject('file_contract', id);
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
