import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNursingNote } from '../models/ch-nursing-note';

@Injectable({
  providedIn: 'root'
})
export class ChNursingNoteService {
  public ch_nursing_note: ChNursingNote[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNursingNote[]> {
    let servObj = new ServiceObject(params ? 'ch_nursing_note?pagination=false' : 'ch_nursing_note');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nursing_note = <ChNursingNote[]>servObj.data.ch_nursing_note;

        return Promise.resolve(this.ch_nursing_note);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record, type): Promise<ChNursingNote[]> {
    let servObj = new ServiceObject('ch_nursing_note/by_record/' + record + '/' + type + '?pagination=false');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nursing_note = <ChNursingNote[]>servObj.data.ch_nursing_note;

        return Promise.resolve(this.ch_nursing_note);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nursing_note: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_note');
    servObj.data = ch_nursing_note;
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

  Update(ch_nursing_note: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_note', ch_nursing_note.id);
    servObj.data = ch_nursing_note;
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
    let servObj = new ServiceObject('ch_nursing_note', id);
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
