import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { Actions12Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserChangeService } from '../../../business-controller/user-change.service';
@Component({
  selector: 'ngx-signs-evo',
  templateUrl: './signs-evo.component.html',
  styleUrls: ['./signs-evo.component.scss'],
})
export class SignsEvoComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  
  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = [
    
'PRESIÓN ARTERIAL',
'PRESIÓN ARTERIAL MEDIA',
'FRECUENCIA CARDIACA',
'FRECUENCIA RESPIRATORIA',
'TEMPERATURA', 
'SATURACIÓN', 
'PESO',
'TALLA',


  ];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false; 
  public all_changes: any[];
  public saveEntry: any = 0;
  

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },

    columns: {
      
      field_set:{
        title: this.headerFields[0],
        type: 'string',
      },

      pressure_half:{
        title: this.headerFields[1],
        type: 'string',
      },
      cardiac_frequency: {
        title: this.headerFields[2],
        type: 'string',
      },
      respiratory_frequency: {
        title: this.headerFields[3],
        type: 'string',
      },
      temperature: {
        title: this.headerFields[4],
        type: 'string',
      },
      oxigen_saturation: {
        title: this.headerFields[5],
        type: 'string',
      },
      weight: {
        title: this.headerFields[6],
        type: 'string',
      },
      size: {
        title: this.headerFields[7],
        type: 'string',
      },


    },
  };

  constructor(
    private chvitalSignsS: ChVitalSignsService,
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    public userChangeS: UserChangeService,

  ) {

       
  }
  GetParams() {
    return {
      record_id: this.route.snapshot.params.id,
    };
  }
 
  receiveMessage(event) {

  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
  }

  RefreshData() {
    this.table.refresh();
  }

  NewChVitalSigns() {
    this.chvitalSignsS.Save({

      record_id: this.record_id,
    }).then(x => {
      this.toastService.success('', x.message);
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });

  }


}
