import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { EducationalInstitution } from '../models/educational-institution';
import { ServiceObject } from '../models/service-object';
import { Country } from '../models/country';
import { Region } from '../models/region';
import { Municipality } from '../models/municipality';

@Injectable({
  providedIn: 'root'
})
export class InstitutionBusinessService {

  public educationalInstitutions: EducationalInstitution[] = [];
  public countries: Country[] = [];
  public regions: Region[] = [];
  public municipalities: Municipality[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<EducationalInstitution[]> {
    var servObj = new ServiceObject("institution");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.educationalInstitutions = <EducationalInstitution[]>servObj.data.Institutions;
        return Promise.resolve(this.educationalInstitutions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(inst: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("institution");
    servObj.data = inst;
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

  Update(inst: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("institution", inst.id);
    servObj.data = inst;
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

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("institution", id);
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

  GetCustomFields(id: number): Promise<any[]> {
    var servObj = new ServiceObject("customField/allByInstitution", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any[]>servObj.data.customFieldInstitution);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetCountries(): Promise<Country[]> {
    var servObj = new ServiceObject("country");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.countries = <Country[]>servObj.data.countrys;
        return Promise.resolve(this.countries);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetRegionByCountry(id: number): Promise<Region[]> {
    var servObj = new ServiceObject("region/byCountry", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.regions = <Region[]>servObj.data.regions;
        return Promise.resolve(this.regions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetMunicipalityByRegion(id: number): Promise<Municipality[]> {
    var servObj = new ServiceObject("municipality/byRegion", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.municipalities = <Municipality[]>servObj.data.municipalitys;
        return Promise.resolve(this.municipalities);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetInstitutionByParent(id: number): Promise<EducationalInstitution[]> {
    var servObj = new ServiceObject("institution/byParent", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.educationalInstitutions = <EducationalInstitution[]>servObj.data.institutions;
        return Promise.resolve(this.educationalInstitutions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetInstitutionById(id: number): Promise<EducationalInstitution[]> {
    var servObj = new ServiceObject("institution/byId", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.educationalInstitutions = <EducationalInstitution[]>servObj.data.institution;
        return Promise.resolve(this.educationalInstitutions);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
