import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'ngx-academic-record',
  templateUrl: './academic-record.component.html',
  styleUrls: ['./academic-record.component.scss']
})
export class AcademicRecordComponent implements OnInit {
  public messageError = null;
  public title = 'Registro académico';

  public loading = true;
  public loadingGroups = false;
  public loadingResume = false;
  public loadingDownload = false;

  public courses = [];
  public groups = [];

  public _course = null;
  public group = null;

  public curso = null;
  public asistentes = 0;

  @ViewChild('groupsAutocomplete') groupsAutocomplete: AutocompleteComponent;


  constructor(
    private ReportSGA: ReportsSgaService
  ) { }

  ngOnInit(): void {
    this.ReportSGA.GetCustomFilters('courses', {
    }).then(x => {
      this.courses = x.courses;
      this.loading = false;
    });
  }


  async SearchGroups(course_id) {
    this.loadingGroups = true;
    this.ReportSGA.GetCustomFilters('filterGroups', {
      course_id,
    }).then(x => {
      this.setGroups(x.groups);
      this.loadingGroups = false;
    });
  }

  set course(value) {
    if (value)
      this.SearchGroups(value.value);
    else {
      this.setGroups([]);
    }
    this._course = value;
  }

  private setGroups(groups) {
    this.groups = groups;
    this.curso = null;
    this.messageError = null;
    this.groupsAutocomplete.clearText();
    this.groupsAutocomplete.setOptions(groups);
  }

  get course() {
    return this._course;
  }

  SearchResume() {
    this.messageError = null;
    this.loadingResume = true;
    this.curso = null;
    this.asistentes = 0;
    this.ReportSGA.GetCustomFilters('resumeAcademicRecord', {
      course_id: this.course.value,
      group_id: this.group.value,
    }).then(x => {
      this.loadingResume = false;

      this.curso = x.course;
      this.asistentes = x.discentes;
    }).catch(e => {
      this.loadingResume = false;
      this.messageError = e;
    });
  }

  DownloadCertificate() {
    this.loadingDownload = true;
    this.ReportSGA.GenerateReportPDF('academicRecord', {
      course_id: this.course.value,
      group_id: this.group.value,
    }).then(x => {
      window.open(x.url, '_blank');
      this.loadingDownload = false;
    }).catch(e => {
      this.loadingDownload = false;
    });
  }

}
