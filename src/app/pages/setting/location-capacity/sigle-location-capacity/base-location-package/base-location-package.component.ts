import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AnyAaaaRecord } from 'dns';
import { AssistanceService } from '../../../../../business-controller/assistance.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { FormLocationCapacityComponent } from '../form-location-capacity/form-location-capacity.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-base-location-package',
  templateUrl: './base-location-package.component.html',
  styleUrls: ['./base-location-package.component.scss']
})
export class BaseLocationPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table_base: BaseTableComponent;
  @Input() parentData: AnyAaaaRecord;
  @Input() from_form: boolean = true;
  @Output() emitMessage = new EventEmitter<any>();

  public isSubmitted = false;
  public messageError: string = null;
  public title_base: string = 'CAPACIDAD INSTALADA BASE';
  public subtitle_base: string = 'Comunas, Localidades o Veredas'.toUpperCase();;
  public headerFields_base: any[] = ['MES', 'Comuna, Localidad o Vereda'.toUpperCase(), 'CAPACIDAD BASE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields_base[1]}`;
  public icon: string = 'nb-star';
  public assistance_id;
  public assistance_name;
  public data = [];

  public settings_base = {
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      'locality': {
        title: this.headerFields_base[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.locality) {
            return row.locality.name;
          } else {
            return row.phone_consult;
          }
        }
      },
      PAD_base_patient_quantity: {
        title: this.headerFields_base[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Capacidad instalada',
      route: '../../setting/base-location-package',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private assistanceS: AssistanceService,
    private deleteConfirmService: NbDialogService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.assistance_id = this.parentData;
  }

  back() {
    this.location.back();

 }
  GetParams() {
    return {
      assistance_id: this.route.snapshot.params.user_id,
    };
  }

  RefreshData() {
    this.table_base.refresh();
    this.emitMessage.emit(true);
  }

  NewSigleLocationCapacity() {
    this.dialogFormService.open(FormLocationCapacityComponent, {
      context: {
        title: 'Editar capacidad instalada',
        data: {
          id: this.assistance_id,
        },
        procedence: 1,
        saved: this.RefreshData.bind(this),
      },
    });
  }

}
