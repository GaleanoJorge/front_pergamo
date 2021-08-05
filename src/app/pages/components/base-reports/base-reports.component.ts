import {Component, Input, OnInit} from '@angular/core';
import {OldreportsSgaService} from '../../../business-controller/oldreports-sga.service';
import {ReportsSgaService} from '../../../business-controller/reports-sga.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-base-reports',
  templateUrl: './base-reports.component.html',
  styleUrls: ['./base-reports.component.scss'],
})
export class BaseReportsComponent implements OnInit {
  @Input() title = null;
  @Input() messageError = null;
  @Input() loading = true;
  @Input() exportExcel = null;
  @Input() exportExcelSGA = null;
  @Input() exportPdf = null;
  @Input() filters = null;
  @Input() filtersRequired = [];
  @Input() validateData = () => {
    return true
  };

  public loadingReport = false;

  constructor(
    private oldReportsSgaBS: OldreportsSgaService,
    private ReportsSgaBS: ReportsSgaService,
    private toast: NbToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  actionExportExcel() {
    if (!this.validateFiltersRequired()) return false;

    this.loadingReport = true;
    const params = this.filters ? this.filters : {};
    // console.log(params)
    this.oldReportsSgaBS.GenerateReport(this.exportExcel, params).then(x => {
      window.open(x.url, '_blank');
      this.loadingReport = false;
    }).catch(e => {
      this.loadingReport = false;
    });
    // this.loadingReport = false;
  }

  actionExportExcelSGA() {
    if (!this.validateFiltersRequired()) return false;
    if (!this.validateData()) return false;

    this.loadingReport = true;
    const params = this.filters ? this.filters : {};
    // console.log(params)
    this.ReportsSgaBS.GenerateReport(this.exportExcelSGA, params).then(x => {
      window.open(x.url, '_blank');
      this.loadingReport = false;
    }).catch(e => {
      this.loadingReport = false;
    });
    // this.loadingReport = false;
  }

  actionExportPdf() {

  }

  validateFiltersRequired() {
    let valid = true;
    const keysRequired = Object.keys(this.filtersRequired);

    keysRequired.map(req => {
      if (!this.filters[req]) {
        valid = false;
        this.toast.danger('', `El filtro ${this.filtersRequired[req]} es obligatorio`);
      }
    });

    return valid;
  }

}
