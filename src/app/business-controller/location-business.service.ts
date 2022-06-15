import {Injectable} from '@angular/core';
import {Country} from '../models/country';
import {WebAPIService} from '../services/web-api.service';
import {ServiceObject} from '../models/service-object';
import {Region} from '../models/region';
import {Municipality} from '../models/municipality';
import {EducationalInstitution} from '../models/educational-institution';
import {Course} from '../models/course';
import {CourseEducationalInstitution} from '../models/course-educational-institution';
import { Locality } from '../models/locality';

@Injectable({
  providedIn: 'root'
})
export class LocationBusinessService {

  public countries: Country[] = [];
  public regions: Region[] = [];
  public municipalities: Municipality[] = [];
  public locality: Locality[] = [];
  public institutions: EducationalInstitution[] = [];
  public courses: CourseEducationalInstitution[] = [];
  public neighborhood_or_residence: any[] = [];


  constructor(private webAPI: WebAPIService) {
    this.countries = [];
    this.regions = [];
    this.municipalities = [];
    this.locality = [];
    this.neighborhood_or_residence = [];
    this.institutions = [];
    this.courses = [];
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

  GetRegionByCountry($countryId): Promise<Region[]> {
    var servObj = new ServiceObject("region/byCountry", $countryId);
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

  GetPublicRegionByCountry(country_id): Promise<Region[]> {
    let servObj = new ServiceObject('public/region');
    return this.webAPI.GetAction(servObj, {
      country_id,
    })
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

  GetMunicipalitiesByRegion($regionId): Promise<Municipality[]> {
    var servObj = new ServiceObject("municipality/byRegion", $regionId);
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

  GetPublicMunicipalitiesByRegion(region_id): Promise<Municipality[]> {
    let servObj = new ServiceObject('public/municipality');
    return this.webAPI.GetAction(servObj, {
      region_id,
    })
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

  GetLocalityByMunicipality(municipality_id): Promise<Locality[]> {
    let servObj = new ServiceObject('residence/locationbyMunicipality',municipality_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.locality = <Locality[]>servObj.data.locality;
        return Promise.resolve(this.locality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetNeighborhoodResidenceByLocality(locality_id): Promise<Locality[]> {
    let servObj = new ServiceObject('residence/byLocality',locality_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.neighborhood_or_residence = <Municipality[]>servObj.data.neighborhood_or_residence;
        return Promise.resolve(this.neighborhood_or_residence);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  GetNeighborhoodResidenceByMunicipality(municipality_id): Promise<Municipality[]> {
    let servObj = new ServiceObject('residence/byMunicipality',municipality_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.neighborhood_or_residence = <Municipality[]>servObj.data.neighborhood_or_residence;
        return Promise.resolve(this.neighborhood_or_residence);
      })
      .catch(x => {
        throw x.message;
      });
  }


  GetInstitutionsByMunicipality($munId): Promise<EducationalInstitution[]> {
    var servObj = new ServiceObject("institution/byMunicipality", $munId);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.institutions = <EducationalInstitution[]>servObj.data.institutions;
        return Promise.resolve(this.institutions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetCoursesByInstitution($instId): Promise<CourseEducationalInstitution[]> {
    var servObj = new ServiceObject("course/allByInstitution", $instId);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.courses = <CourseEducationalInstitution[]>servObj.data.courses;
        return Promise.resolve(this.courses);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
