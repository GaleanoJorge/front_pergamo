import { Injectable } from '@angular/core';
import { Competition } from '../models/competition';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class CompetitionBusinessService {

  public competitions: Competition[] = [];
  public competition: Competition[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(id: number): Promise<Competition[]> {
    var servObj = new ServiceObject("competition/allByCourse", id);
    this.competitions = [];
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.competitions = <Competition[]>servObj.data.activities;
        return Promise.resolve(this.competitions);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetSingleCollection(params = {}): Promise<Competition[]> {
    let servObj = new ServiceObject('competition');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.competition = <Competition[]>servObj.data.competition;

        return Promise.resolve(this.competition);
      })
      .catch(x => {
        throw x.message;
      });
  }
  GetByCourse(id: number): Promise<Competition[]> {
    var servObj = new ServiceObject("course/byIdWithCompetitions", id);
    this.competitions = [];
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        servObj.data.courses.forEach(item => {
          item.modules.forEach(module => {
            module.sessions.forEach(session => {
              session.activities.forEach(activity => {
                activity.criteria.forEach(criteria => {
                  if (!this.competitions.some(({ id }) => id == criteria.competition.id)) {
                    criteria.competition.criterion = [];
                    this.competitions.push(criteria.competition);
                  }
                  this.competitions.forEach(element => {
                    if (element.id == criteria.competition.id && !element.criterion.some(({ id }) => id == criteria.id))
                      element.criterion.push(criteria);
                  });
                });
              });
            });
          });
        });
        return Promise.resolve(this.competitions);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }
  
  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('competition');
    servObj.data = sub;
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

  Update(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('competition', sub.id);
    servObj.data = sub;
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
    let servObj = new ServiceObject('competition', id);
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
