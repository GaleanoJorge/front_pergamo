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
  public headerFields: any[] = ['PRESIÓN ARTERIAL'];
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
      perPage: 30,
    },

    columns: {
      
      observations_glucometry: {
        title: this.headerFields[0],
        width: 'string',
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
