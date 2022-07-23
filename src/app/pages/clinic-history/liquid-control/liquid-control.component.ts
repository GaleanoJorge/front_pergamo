import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { VALUE } from '@syncfusion/ej2-angular-filemanager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChLiquidControlService } from '../../../business-controller/ch-liquid-control.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { time } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'ngx-liquid-control',
  templateUrl: './liquid-control.component.html',
  styleUrls: ['./liquid-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public calulateLiquidControl: any[] = [];
  public vital_signs: any[] = [];
  public hour;
  public urinalWaste;
  public hidricBalance;
  public Diur = 0;
  public admin = 0;
  public eliminate = 0;


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
            // this.admin = this.admin + row.delivered_volume;
            return 'ADMINISTRADO'
          } else {
            // if(row.ch_route_fluid.name == "DIURESIS"){
            //   this.Diur = this.Diur + row.delivered_volume;
            // }
            // this.admin = this.admin + row.delivered_volume;
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
        title: this.headerFields[5],
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
    private liquidControlS: ChLiquidControlService,
    private chVitalSignS: ChVitalSignsService,

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

    this.liquidCalculator();
  }

  async liquidCalculator() {
    const destroyByClick = true;
    var diur = 0;
    var admin = 0;
    var eliminate = 0;
    var adicional;
    await this.liquidControlS.GetByRecord(this.record_id).then(x => {
      if (x.length > 0) {
        this.calulateLiquidControl = x;
        this.calulateLiquidControl.forEach(element => {
          if (element.ch_route_fluid.type == 0) {
            admin = admin + element.delivered_volume;
          } else {
            if (element.ch_route_fluid.name == "DIURESIS") {
              diur = diur + element.delivered_volume
            }
            eliminate = eliminate + element.delivered_volume;
          }
        });
      } else {
        this.calulateLiquidControl = null;
        this.toastService.info('', 'Se deben agregar registros para calcular datos hídricos', { destroyByClick })
      }
    });

    await this.chVitalSignS.GetByRecord(this.record_id).then(x => {
      if (x.length > 0) {
        this.vital_signs = x;
      } else {
        this.vital_signs = null;
        this.toastService.info('', 'Se deben diligenciar los signos vitales para calcular valores hídricos', { destroyByClick })
      }
    });
    if (this.calulateLiquidControl && this.vital_signs) {
      let Maxhour = Number(this.calulateLiquidControl[0].clock.substring(0, 1));
      let Maxmin = Number(this.calulateLiquidControl[0].clock.substring(3, 4));

      let Minhour = Number(this.calulateLiquidControl[this.calulateLiquidControl.length - 1].clock.substring(0, 1));
      let Minmin = Number(this.calulateLiquidControl[this.calulateLiquidControl.length - 1].clock.substring(3, 4));

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
      this.urinalWaste = this.vital_signs[0].weight / this.hour / diur;
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
      this.hidricBalance = admin - eliminate;
      this.form.patchValue({
        urine_waste: this.urinalWaste == Infinity ? 'Faltan datos' : this.urinalWaste.toFixed(3) + ' : ' + adicional,
        urine_balance: this.hidricBalance,
      });

      // max.setHours(this.calulateLiquidControl[0].clock .substring(0, 1), this.calulateLiquidControl[0].clock.substring(3, 4));

    } else {

    }
    this.table.refresh();
  }

  RefreshData() {
    this.liquidCalculator();
  }

  NewChVitalSigns() {

  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

}
