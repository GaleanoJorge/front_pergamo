import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {AnswerTypeService} from '../../../../business-controller/answer-type.service';

@Component({
  selector: 'ngx-form-edit-scales',
  templateUrl: './form-edit-scales.component.html',
  styleUrls: ['./form-edit-scales.component.scss'],
})
export class FormEditScalesComponent implements OnInit {
  public title: string = 'Editar escalas';
  public messageError: string = null;
  public loading: boolean = false;
  public routeBack = '/pages/pollconfiguration/scales';
  public data = null;
  public routes = [
    {
      name: 'Escalas',
      route: '/pages/pollconfiguration/scales',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  constructor(
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private answerTypeBS: AnswerTypeService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.answerTypeBS.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }
}
