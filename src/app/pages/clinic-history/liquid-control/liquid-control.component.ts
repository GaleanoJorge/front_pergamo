import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChLiquidControlService } from '../../../business-controller/ch-liquid-control.service';
import { nullSafeIsEquivalent, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { time } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'ngx-liquid-control',
  templateUrl: './liquid-control.component.html',
  styleUrls: ['./liquid-control.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidControlComponent implements OnInit {
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  linearMode = true;
  public messageError = null;
  public title: string = 'CONTROL DE LÍQUIDOS';
  public subtitle: string = 'INGRESADOS/ELIMINADOS';
  public headerFields: any[] = ['FLUIDO', 'ELEMENTO', 'TIPO DE FLUIDO', 'CANTIDAD (CC)', 'ADICIONAL', 'HORA DEL EVENTO'];
  public routes = [];
  public data = [];
  public auxForm: any = null;
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public form: FormGroup;
  public show;

  public calulateLiquidControl: any[] = [];
  public vital_signs: any[] = [];
  public hour;
  public max_hour;
  public min_hour;
  public urinalWaste;
  public hidricBalance;
  public Diur = 0;
  public admin = 0;
  public eliminate = 0;
  public done = false;

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
          if(!this.done){
            this.min_hour = row.clock;
            this.max_hour = row.clock;
            this.admin = 0;
            this.Diur = 0;
            this.eliminate = 0;
            this.done = true;
          }else{
            this.max_hour = row.clock
          }
          if (row.ch_route_fluid.type == 0) {
            this.admin = this.admin + row.delivered_volume;
            return 'ADMINISTRADO'
          } else {
            if(row.ch_route_fluid.name == "DIURESIS"){
              this.Diur = this.Diur + row.delivered_volume;
            }
            this.eliminate = this.eliminate + row.delivered_volume;
            return 'ELIMINADO'
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
          this.liquidCalculator(row.weight);
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
            return '--';
          }

        },
      },
      clock: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value;
          } else {
            return '--';
          }
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private liquidControlS: ChLiquidControlService,
    private chVitalSignS: ChVitalSignsService,

  ) {
  }
  GetParams() {
    return {
      record_id: this.route.snapshot.params.id,
    };
  }

  async ngOnInit(): Promise<void> {
    this.record_id = this.route.snapshot.params.id;

    if (!this.auxForm) {
      this.auxForm = {
        urine_waste: '',
        urine_balance: '',
      };
    }

    this.form = this.formBuilder.group({
      urine_waste: [this.auxForm.urine_waste],
      urine_balance: [this.auxForm.urine_waste]
    });

  }

  async liquidCalculator(weight) {

    var adicional;

    if (this.done && weight) {
      let Maxhour = Number(this.max_hour.substring(0, 2));
      let Maxmin = Number(this.max_hour.substring(3, 5));

      let Minhour = Number(this.min_hour.substring(0, 2));
      let Minmin = Number(this.min_hour.substring(3, 5));

      var hour = Maxhour - Minhour;
      var min = Maxmin - Minmin;
      if (hour > 0) {
        if (min >= 0) {
          this.hour = hour + (min / 60);
        } else {
          min = 60 + min;
          this.hour = (hour - 1) + (min / 60);
        }
      } else {
        if (min >= 0) {
          this.hour = hour + (min / 60);
        } else {
          min = 60 + min;
          this.hour = (hour - 1) + (min / 60);
        }
      }

      //Gasto Urinario
      this.urinalWaste = weight / this.hour / this.Diur;
      if (this.urinalWaste <= 0.3) {
        adicional = 'ANURIA';
      } else if (this.urinalWaste > 0.3 && this.urinalWaste <= 0.7) {
        adicional = 'OLIGURIA';
      } else if (this.urinalWaste > 0.7 && this.urinalWaste <= 1) {
        adicional = 'NORMAL';
      } else {
        adicional = 'NO APLICA'
      }

      //Balance hídrico
      this.hidricBalance = this.admin - this.eliminate;
      this.form.patchValue({
        urine_waste: this.urinalWaste == Infinity ? 'Faltan datos' : this.urinalWaste.toFixed(3) + ' : ' + adicional,
        urine_balance: this.hidricBalance,
      });
      this.toastService.primary('Calculados valores hidricos','Información');


    } else {
      this.toastService.info('Se deben registrar valores hidricos y signos vitales para calculos hidricos','Información');
      this.form.patchValue({
        urine_waste: "--",
        urine_balance: "--",
      })
    }
    // this.table.refresh();
  }

  RefreshData() {
    this.done = false;
    this.table.refresh();
    // this.liquidCalculator();
  }

  NewChVitalSigns() {

  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  tablock(e) {
    switch (e.tabTitle) {
      case "Administrados": {
        this.show = 1;
        break;
      }
      case "Eliminados": {
        this.show = 2;
        break;
      }
    }
  }

}