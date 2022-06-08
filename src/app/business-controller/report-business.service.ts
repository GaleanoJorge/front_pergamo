import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportBusinessService {

  constructor(private webAPI: WebAPIService) { }

  GetReport1(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/rating/averageByStudentCourseAndMinMax");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport2(): Promise<any> {
    var servObj = new ServiceObject("report/rating/averageDeliveryRegion");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport3(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/percentage/competitionByStudentCourse");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport4(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/rating/activityByStudentCourse");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport5(data): Promise<any> {
    var paramsMain = new HttpParams()
      .set("estudiante", data.student)
      .set("curso", data.course)
      .set("institución", data.institution)
      .set("departamento", data.region);
    var servObj = new ServiceObject("report/progress/expectedByStudentCourseInstitutionRegion");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport6(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/rating/allByStudentCourse");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport7(data): Promise<any> {
    var paramsMain = new HttpParams().set("institucion", data.institution);
    var servObj = new ServiceObject("report/rating/approvedStudents");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport8(): Promise<any> {
    var servObj = new ServiceObject("report/percentage/noApprovedStudents");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport9(): Promise<any> {
    var servObj = new ServiceObject("report/progress/studentsPendingDelivery");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport10(data): Promise<any> {
    var paramsMain = new HttpParams()
      .set("estudiante", data.student)
      .set("curso", data.course)
      .set("institucion", data.institution);
    var servObj = new ServiceObject("report/percentage/groupAndIndividualDeliveries");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport11(): Promise<any> {
    var servObj = new ServiceObject("report/rating/gradePointTeachers");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport11B(): Promise<any> {
    var servObj = new ServiceObject("report/percentage/averageGradesForTeacher");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport13(data): Promise<any> {
    var paramsMain = new HttpParams()
      .set("estudiante", data.student)
      .set("curso", data.course)
      .set("region", data.region);
    var servObj = new ServiceObject("report/percentage/studentCompetitionsTecnovsTecnos");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport15(): Promise<any> {
    var servObj = new ServiceObject("report/progress/gradePointAveragePerCourse");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport16(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/progress/approvedDeliveries");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetReport16B(data): Promise<any> {
    var paramsMain = new HttpParams().set("estudiante", data.student).set("curso", data.course);
    var servObj = new ServiceObject("report/progress/approvedDeliveries2");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProjectProgress(): Promise<any> {
    var servObj = new ServiceObject("report/progress/projectProgress");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetFUID(): Promise<any> {
    var servObj = new ServiceObject("report/progress/fuid");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetGoals(): Promise<any> {
    var servObj = new ServiceObject("report/progress/goals");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
