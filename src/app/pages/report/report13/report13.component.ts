import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../business-controller/course-business.service';
import { NbToastrService } from '@nebular/theme';
import { LocationBusinessService } from '../../../business-controller/location-business.service';

@Component({
  selector: 'ngx-report13',
  templateUrl: './report13.component.html',
  styleUrls: ['./report13.component.scss']
})
export class Report13Component implements OnInit {

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
    var cont = 0;
    this.show = false;
    this.reporteBS.GetReport13({
      student: this.studentSelected,
      course: this.courseSelected,
      region: this.regionsSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 ? true : false;
      this.data.type = "radar";
      this.data.title = [x.message];
      this.data.description = [x.message];
      this.data.labels = ["Estudiante", "Región"];
      this.data.indicator = [];
      this.data.datasets = [
        {
          value: [],
          name: "Estudiante",
        },
        {
          value: [],
          name: "Región",
        }
      ];
      x.data.report.forEach(element => {
        if (cont < (x.data.report.length / 2)) {
          this.data.datasets[0].value.push(element.PorcentajeCompetencia);
        } else {
          this.data.datasets[1].value.push(element.PorcentajeCompetencia);
        }
        if (!this.data.indicator.some(({ name }) => name == element.Competencia))
          this.data.indicator.push({ name: element.Competencia, max: 100 });
        cont++;
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}
