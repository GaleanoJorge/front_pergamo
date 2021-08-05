import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service';
import {NbMenuService} from '@nebular/theme';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-actions-report-surveys',
  templateUrl: './actions-report-surveys.component.html',
  styleUrls: ['./actions-report-surveys.component.scss'],
})
export class ActionsReportSurveysComponent implements OnInit {
  @Input() survey_id: number = null;
  @Input() survey_instance_id: number = null;
  public environment = environment;
  public loadingResume = false;
  public tag = null;

  public items = [
    {
      title: 'Resumen Excel',
      id: 'excel',
      survey_id: null,
      survey_instance_id: null,
    },
    {
      title: 'Estadisticas',
      id: 'estadisticas',
      survey_id: null,
      survey_instance_id: null,
    },
  ];

  constructor(
    private surveyBS: SurveyBusinessService,
    private cdr: ChangeDetectorRef,
    private nbMenuService: NbMenuService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.tag = `menu-${this.survey_id}`;

    this.items.map(item => {
      item.survey_id = this.survey_id;
      item.survey_instance_id = this.survey_instance_id;
    });

    if (this.survey_instance_id)
      this.tag += `-${this.survey_instance_id}`;

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === this.tag),
      )
      .subscribe((event) => {
        const item: any = event.item;
        if (item.id === 'excel') this.ShowResume(item.survey_id, item.survey_instance_id);
        if (item.id === 'estadisticas') this.ShowStatistics(item.survey_id, item.survey_instance_id);
      });
  }

  async ShowResume(survey_id, survey_instance_id) {
    const params: any = {};

    if (survey_id) params.survey_id = survey_id;
    if (survey_instance_id) params.survey_instance_id = survey_instance_id;

    this.loadingResume = true;
    this.cdr.detectChanges();
    try {
      const response: any = await this.surveyBS.GetResume(params);
      this.loadingResume = false;
      this.cdr.detectChanges();
      const win = window.open(response.url, '_blank');
      win.focus();
    } catch (e) {
      this.loadingResume = false;
    }
  }

  async ShowStatistics(survey_id, survey_instance_id) {
    const stringParams = [];

    if (survey_id) stringParams.push(`survey_id=${survey_id}`);
    if (survey_instance_id) stringParams.push(`survey_instance_id=${survey_instance_id}`);

    await this.router.navigateByUrl('/pages/survey/statistics?' + stringParams.join('&'));
  }
}
