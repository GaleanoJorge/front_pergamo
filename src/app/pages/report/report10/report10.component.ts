import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { LocationBusinessService } from '../../../business-controller/location-business.service';
import { NbToastrService } from '@nebular/theme';
import { CourseBusinessService } from '../../../business-controller/course-business.service';

@Component({
  selector: 'ngx-report10',
  templateUrl: './report10.component.html',
  styleUrls: ['./report10.component.scss']
})
export class Report10Component implements OnInit {

  public messageError: string = null;
  public data: any = {};
  public show: boolean;
  public countrySelected: string;
  public regionsSelected: string;
  public municipalitySelected: string;
  public institutionSelected: string;
  public courseSelected: string;
  public studentSelected: string;

  constructor(
    private reporteBS: ReportBusinessService,
    public locationBS: LocationBusinessService,
    private toastrService: NbToastrService,
    public courseBS: CourseBusinessService,
  ) { }

  ngOnInit(): void {
    this.locationBS.GetCountries().then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeCountry(e) {
    this.countrySelected = e;
    this.locationBS.GetRegionByCountry(e).then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeRegion(e) {
    this.regionsSelected = e;
    this.locationBS.GetMunicipalitiesByRegion(e).then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeMunicipality(e) {
    this.municipalitySelected = e;
    this.locationBS.GetInstitutionsByMunicipality(e).then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeInstitution(e) {
    this.institutionSelected = e;
    this.locationBS.GetCoursesByInstitution(e).then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeCourse(e) {
    this.courseSelected = e;
    this.courseBS.GetSingle(e).then(x => { this.messageError = null; }).catch(x => { this.messageError = x; });
  }

  changeStudent(e) {
    this.studentSelected = e;
  }

  Search() {
    this.show = false;
    this.reporteBS.GetReport10({
      student: this.studentSelected,
      course: this.courseSelected,
      institution: this.institutionSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 ? true : false;
      this.data.type = "pie";
      this.data.title = [x.message];
      this.data.description = [x.message];
      this.data.labels = ['AprobadosIndividual', 'NoAprobadosIndividual', 'AprobadosGrupal', 'NoAprobadosGrupal'];
      this.data.series = [];
      x.data.report.forEach(element => {
        this.data.series.push({
          value: element['AprobadosIndividual'],
          name: 'AprobadosIndividual',
        });
        this.data.series.push({
          value: element['NoAprobadosIndividual'],
          name: 'NoAprobadosIndividual',
        });
        this.data.series.push({
          value: element['AprobadosGrupal'],
          name: 'AprobadosGrupal',
        });
        this.data.series.push({
          value: element['NoAprobadosGrupal'],
          name: 'NoAprobadosGrupal',
        });
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}
