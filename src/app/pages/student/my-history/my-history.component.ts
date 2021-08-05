import { UserBusinessService } from '../../../business-controller/user-business.service';
import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss'],
})
export class MyHistoryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  public title = 'Historial Laboral del Dicente';
  public subtitle = '';
  public headerFields: any[] =  ['Codigo','Municipio', 'Región',  'Entidad','Posición', 'Fecha'];
  public routes = [];
  public course;
  public user=this.authService.GetUser();
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
    private authService: AuthService
  ) {
    this.routes = [
      {
        name: 'Mi Historial',
        route: '../../student/myhistory',
      }
    ];
    
  }

  GetParams() {
    return {
      user_id: this.user.id
        };
  }

  ngOnInit(): void {
    this.userBS.GetUserCurriculum(this.user.id).then(x => {
      this.user_curriculum = x;
    });
  }

}
