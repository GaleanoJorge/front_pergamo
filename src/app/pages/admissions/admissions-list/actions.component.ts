import { ChangeDetectionStrategy, Component, Input, TemplateRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NbDialogService, NbToastrService, NbListModule } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ViewCell } from 'ng2-smart-table';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { ActivatedRoute } from '@angular/router';
import { ObservationNoveltyService } from '../../../business-controller/observation-novelty.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="d-flex justify-content-center" style="align-items: center;">
      <div class="cuadro" nbTooltip="{{this.value.data.admissions.length == 0  ? 'Sin admisiones activas' :
      this.value.data.admissions[this.value.data.admissions.length - 1].medical_date != '0000-00-00 00:00:00' && this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date == '0000-00-00 00:00:00' ? 'Con salida médica'
      : this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date == '0000-00-00 00:00:00' ? 'Admitido' : 'Sin admisiones activas'}}" nbTooltipPlacement="top" nbTooltipStatus="primary"
          [style]="this.value.data.admissions.length == 0  ? 'background-color: #54bcc1;' :
      this.value.data.admissions[this.value.data.admissions.length - 1].medical_date != '0000-00-00 00:00:00' && this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date == '0000-00-00 00:00:00' ? 'background-color: red;'
      : this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date == '0000-00-00 00:00:00' ? 'background-color: yellow;' : 'background-color: #54bcc1;'">

      </div>
      <a nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost
          [routerLink]="'../../admissions/patient/' + value.data.id+ '/edit'">
          <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="delete"
          *ngIf="block_interact" nbButton ghost (click)="value.delete(value.data)">
          <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <button *ngIf="status" nbButton ghost [nbPopover]="templateRef" nbPopoverTrigger="hover">
          <nb-icon icon="info-outline"></nb-icon>
      </button>
      <a *ngIf="block_interact" nbTooltip="Ingresos del paciente" nbTooltipPlacement="top" nbTooltipStatus="primary"
          nbButton ghost [routerLink]="'../../admissions/admissions-patient/' + value.data.id">
          <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a nbTooltip="Asociar a usuario" nbTooltipPlacement="top" ngxCheckPerms="create" nbTooltipStatus="primary"
          *ngIf="Botton_user_change" nbButton ghost (click)="ShowUserChange(userChangeAction)">
          <nb-icon icon="file-text-outline"></nb-icon>
      </a>

  </div>

  <ng-template #templateRef>
      <div class="p-3">
          <p><strong>Contrato:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].contract.name
              }}</p>
          <p><strong>Sede:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].campus.name
              }}
          </p>
          <p><strong>Ruta de admisión:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].admission_route.name }}</p>
          <p><strong>Ambito de atención:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].scope_of_attention.name }}</p>
          <p><strong>Programa:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].program.name }}</p>
          <p
              *ngIf="this.value.data.admissions[this.value.data.admissions.length -
            1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].flat!=null">
              <strong>Piso:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].flat.name
              }}
          </p>
          <p
              *ngIf="this.value.data.admissions[this.value.data.admissions.length -
            1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].pavilion!=null">
              <strong>Pabellón:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].pavilion.name }}
          </p>
          <p
              *ngIf="this.value.data.admissions[this.value.data.admissions.length -
            1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].bed!=null">
              <strong>Cama:</strong> {{ this.value.data.admissions[this.value.data.admissions.length -
              1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length -
              1].bed.name
              }}
          </p>
      </div>
  </ng-template>
  <ng-template #userChangeAction>
      <div class="container-fluid">
          <nb-card style="width: 430px;">
              <nb-card-header>
                  Asociar cuentas de usuario
              </nb-card-header>
              <nb-card-body>
                  <form [formGroup]="UserChangeForm" (ngSubmit)="SaveChange()">
                      <div>
                          <!-- <div class="col-md-12">
                            <label for="right_user" class="form-text text-muted font-weight-bold">Usuario correcto:</label>
                            <input id="data-list" fullWidth type="text" list="codes" class="data-list"
                            (change)="idFilter($event)" placeholder="Ingrese ID del paciente" required />
                                  <datalist id="codes">
                                  <nb-option *ngFor="let item of right_user" [value]="item.identification">{{item.identification}} - {{item.firstname}} {{item.lastname}}
                                  </nb-option>
                                </datalist>
                          </div>-->

                          <div class="col-12">
                              <label class="form-text text-muted font-weight-bold">Usuario correcto:</label>
                              <input id="data-list" type="text" fullWidth nbInput list="codes" class="data-list"
                                  (change)="saveCode($event)" required>
                              <datalist id="codes">
                                  <option *ngFor="let item of right_user" [value]="item.identification">
                                      {{item.identification}} - {{ item.firstname}} </option>
                              </datalist>
                          </div>

                          <div class="col-md-12">
                              <label for="observation_novelty" class="form-text text-muted font-weight-bold">Tipo de
                                  novedad:</label>
                              <nb-select fullWidth placeholder="Seleccione..." formControlName="observation_novelty_id">
                                  <nb-option value="">Seleccione...</nb-option>
                                  <nb-option *ngFor="let item of observations" [value]="item.id">{{ item.name }}
                                  </nb-option>
                              </nb-select>
                          </div>
                          <div class="div-send">
                              <label></label>
                              <button type="submit" nbButton status="success">Agregar</button>
                          </div>
                      </div>
                  </form>
              </nb-card-body>
          </nb-card>
      </div>
  </ng-template>

  `,
  styleUrls: ['admissions-list.component.scss'],
})
export class ActionsComponent implements ViewCell, OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @ViewChild('autoInput') autoInput;

  public isSubmitted: boolean = false;
  public status;
  public dialog;
  public saved: any = null;
  public UserChangeForm: FormGroup;
  public right_user: any[];
  public selected: string[];
  public observations: any[] = null;
  public asd: any[] = null;
  public user_id;
  public all_users: any[];
  public wrong_user_id;
  loading: boolean;
  @Input() all_changes;
  public Botton_user_change: boolean;
  public block_interact: boolean;

  constructor(
    private dialogService: NbDialogService,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private UserChangeS: UserChangeService,
    private userBS: UserBusinessService,
    private ObservationNoveltyS: ObservationNoveltyService,

  ) {
  }
  async ngOnInit() {
    if (this.value.data.admissions.length == 0) {
      this.status = false;
    } else if (this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date == '0000-00-00 00:00:00') {
      this.status = true;
    }
    this.UserChangeForm = this.formBuilder.group({
      right_user_id: [this.rowData.right_user_id, Validators.compose([Validators.required])],
      observation_novelty_id: [this.rowData.observation_novelty_id, Validators.compose([Validators.required])],
    });
    var compare = this.value.all_changes.find(item => item.wrong_user_id == this.value.data.id);
    var compare2 = this.value.all_changes.find(item => item.right_user_id == this.value.data.id);
    var compareActivities = this.value.all_changes.find(item => item.wrong_user_id == this.value.data.id);

    if (compareActivities) {
      this.block_interact = false;
    } else {
      this.block_interact = true;
    }

    if (compare || compare2) {
      this.Botton_user_change = false;
    } else {
      this.Botton_user_change = true;
    }
  }

  async ShowUserChange(dialog: TemplateRef<any>) {
    await this.userBS.GetByPacient({ identification: this.value.data.identification }).then(x => {
      this.right_user = x;
    });

    this.ObservationNoveltyS.GetCollection().then(x => {
      this.observations = x;
    });

    this.dialog = this.dialogService.open(dialog);
  }

  saveCode(e): void {
    if (this.right_user) {
      var localidentify = this.right_user.find(item => item.identification == e.target.value);
  
      if (localidentify) {
        this.user_id = localidentify.id;
        this.wrong_user_id = this.user_id;
        this.UserChangeForm.controls.right_user_id.setValue(this.value.data.id);
      } else {
        this.user_id = null;
      }
    } else {
      this.user_id = null;
    }
  }

  SaveChange() {
    this.isSubmitted = true;
    if (!this.UserChangeForm.invalid) {
      this.loading = true;
      var formData = new FormData();
      formData.append('right_user_id', this.user_id);
      // console.log(formData);
      formData.append('wrong_user_id', this.UserChangeForm.controls.right_user_id.value);
      // console.log(formData);
      formData.append('observation_novelty_id', this.UserChangeForm.controls.observation_novelty_id.value);
      this.dialog = this.dialog.close();
      this.UserChangeS.Save(formData).then(x => {
        this.toastService.success('', x.message);
        this.dialog.close();
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    } else {
      this.dialog = this.dialog.close();
      this.UserChangeS.Save({
        wrong_user_id: this.value.data.id,
        right_user_id: this.user_id,
        observation_novelty_id: this.UserChangeForm.controls.observation_novelty_id.value,
      }).then(x => {
        this.toastService.success('', x.message);
        this.dialog.close();
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    }
  }
}
