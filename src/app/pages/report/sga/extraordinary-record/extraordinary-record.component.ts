import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsSgaService } from '../../../../business-controller/reports-sga.service';
import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'ngx-extraordinary-record',
  templateUrl: './extraordinary-record.component.html',
  styleUrls: ['./extraordinary-record.component.scss']
})
export class ExtraordinaryRecordComponent implements OnInit {

  public messageError = null;
  public title = 'Reporte registro extraordinario';
  public exportExcelSGA = 'extraordinaryRecord';

  public loading = true;
  public loadingGroups = false;
  public loadingReport = true;
  public loadingDownload = false;

  public courses = [];
  public groups = [];

  public _course = null;
  public group = null;

  @ViewChild('groupsAutocomplete') groupsAutocomplete: AutocompleteComponent;

  constructor(
    private ReportSGA: ReportsSgaService
  ) { }

  ngOnInit(): void {
    this.ReportSGA.GetCustomFilters('courses', {
    }).then(x => {
      this.courses = x.courses;
      this.loading = false;
      this.loadingReport = true;
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
    this.loadingReport = true;
    this.messageError = null;
    this.groups = groups;
    this.groupsAutocomplete.clearText();
    this.groupsAutocomplete.setOptions(groups);
  }

  get course() {
    return this._course;
  }

  onSelectionChange(e){
    this.loadingReport = true;
    this.messageError = null;
    if(e){
      this.loadingReport = false;
    }
  }

  exportExcelData(){
    this.loadingDownload = true;
    this.messageError = null;
    this.ReportSGA.GenerateReport('extraordinaryRecord', {
      course_id: this.course.value,
      group_id: this.group.value,
    }).then(x => {
      if(x.status){
        window.open(x.url, '_blank');
      }else{
        this.messageError = x.message
      }
      this.loadingDownload = false;
    }).catch(e => {
      this.messageError = e
      this.loadingDownload = false;
    });
  }

}
