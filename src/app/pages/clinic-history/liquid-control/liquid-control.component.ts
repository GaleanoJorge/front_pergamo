import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-liquid-control',
  templateUrl: './liquid-control.component.html',
  styleUrls: ['./liquid-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidControlComponent implements OnInit {
  @Input() record_id: any = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  linearMode = true;
  public messageError = null;
  public title: string = 'CONTROL DE FLUIDOS';
  public subtitle: string = 'INGRESADOS/ELIMINADOS';
  public headerFields: any[] = ['FLUIDO', 'ELEMENTO', 'TIPO DE FLUIDO', 'CANTIDAD (CC)', 'ADICIONAL', 'HORA DEL EVENTO' ];
  public routes = [];
  public data = [];
  public auxForm: any = null;
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public form: FormGroup;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    columns: {
      // actions: {
      //   title: 'Acciones',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     return {
      //       'data': row,
      //     };
      //   },
      // },
      ch_type_fluid_id: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.ch_route_fluid.type == 0) {
            return 'INGRESA'
          } else {
            return 'ELIMINA'
          }
        },
      },
      ch_route_fluid: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      ch_type_fluid: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      delivered_volume: {
        title: this.headerFields[3],
        type: 'string',
      },
      specific_name: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value;
          } else {
            return 'NO APLICA';
          }

        },
      },
      clock: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value;
          } else {
            return 'NO APLICA';
          }

        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,

  ) {

    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      }, {
        name: 'Registro Histotia Clinia',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];
  }
  GetParams() {
    return {
      record_id: this.route.snapshot.params.id,
    };
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    if (!this.auxForm) {
      this.auxForm = {
        urine_waste: '',
        urine_balance: '',
      };
    }

    this.form = this.formBuilder.group({
      urine_waste:[this.auxForm.urine_waste],
      urine_balance:[this.auxForm.urine_waste]
    });

  }

  RefreshData() {
    this.table.refresh();
  }

  NewChVitalSigns() {

  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

}
