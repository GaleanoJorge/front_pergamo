import { Component, OnInit } from '@angular/core';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { LocationBusinessService } from '../../../business-controller/location-business.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-report7',
  templateUrl: './report7.component.html',
  styleUrls: ['./report7.component.scss']
})
export class Report7Component implements OnInit {

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
  }

  Search() {
    this.show = false;
    this.reporteBS.GetReport7({
      institution: this.institutionSelected
    }).then(x => {
      this.toastrService.success("", "Busqueda realizada correctamente!");
      this.show = x.data.report.length > 0 ? true : false;
      this.data.type = "pie";
      this.data.title = [x.message];
      this.data.description = [x.message];
      this.data.labels = ['Aprobados', 'NoAprobados'];
      this.data.series = [];
      x.data.report.forEach(element => {
        this.data.series.push({
          value: element['Aprobados'],
          name: 'Aprobados',
        })
        this.data.series.push({
          value: element['NoAprobados'],
          name: 'NoAprobados',
        })
      });
    }).catch(x => {
      this.messageError = null;
    });
  }

}
