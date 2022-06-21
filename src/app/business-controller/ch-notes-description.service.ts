import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNotesDescription } from '../models/ch-notes-description'; 

@Injectable({
  providedIn: 'root'
})
export class ChNotesDescriptionService {
  public ch_notes_description: ChNotesDescription[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params): Promise<ChNotesDescription[]> {
    let servObj = new ServiceObject(params ? 'ch_notes_description?pagination=false' : 'ch_notes_description');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_notes_description = <ChNotesDescription[]>servObj.data.ch_notes_description;

        return Promise.resolve(this.ch_notes_description);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_notes_description: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_notes_description');
    servObj.data = ch_notes_description;
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

  Update(ch_notes_description: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_notes_description', ch_notes_description.id);
    servObj.data = ch_notes_description;
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
    let servObj = new ServiceObject('ch_notes_description', id);
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
