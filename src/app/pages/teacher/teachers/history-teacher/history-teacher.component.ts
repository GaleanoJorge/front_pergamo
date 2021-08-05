import { UserBusinessService } from '../../../../business-controller/user-business.service';
import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-history-teacher',
  templateUrl: './history-teacher.component.html',
  styleUrls: ['./history-teacher.component.scss'],
})
export class HistoryTeacherComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  public title = 'Historial de Formador';
  public subtitle = '';
  public headerFields: any[] =  ['Código','Municipio', 'Región',  'Entidad','Posición', 'Fecha'];
  public routes = [];
  public course;
  public data= [];
  public user_curriculum;

  public settings = {
    columns: {
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      municipality_name: {
        title: this.headerFields[1],
        type: 'string',
      },
      region_name: {
        title: this.headerFields[2],
        type: 'string',
      },
      entity_name: {
        title: this.headerFields[3],
        type: 'string',
      },
      position_name: {
        title: this.headerFields[4],
        type: 'string',
      },
      date: {
        title: this.headerFields[5],
        type: 'date',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private userBS: UserBusinessService,
    private router: Router,
  ) {
    this.routes = [
      {
        name: 'Formadores',
        route: '../../../../teacher/teachers',
      },
      {
        name: 'Historial',
        route: '../../../../teacher/teachers/history-teacher/' + this.route.snapshot.params.user_id,
      },
    ];
    
  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  ngOnInit(): void {
    this.userBS.GetUserCurriculum(this.route.snapshot.params.user_id).then(x => {
      this.user_curriculum = x;
    });
  }

}
