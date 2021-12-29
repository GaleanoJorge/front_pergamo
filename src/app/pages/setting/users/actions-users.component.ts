import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService,NbDialogRef, NbToastrService, NbWindowService} from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { window } from 'rxjs/operators';
import { CampusService } from '../../../business-controller/campus.service';
import { UserCampusBusinessService } from '../../../business-controller/user-campus.service';


@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a  nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary"  ngxCheckPerms="update" nbButton ghost (click)="open(dialog)">
      <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <!--<button ngxCheckPerms="delete" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>-->
      <button  nbTooltip="Forzar Cambio Contraseña" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost (click)="value.reset_password(value.data)" >
        <nb-icon [icon]="(value.data.force_reset_password ? 'shield-outline' : 'shield-off-outline')"></nb-icon>
      </button>
      <a nbTooltip="Agregar Sede a usuario" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost (click)="open(dialog2)" >
      <nb-icon icon="plus-circle"></nb-icon>
    </a>
    </div>
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card>
          <nb-card-header>Editar usuario</nb-card-header>
          <nb-card-body>
              <nb-select fullWidth placeholder="Seleccione uno de los roles del usuario" [(selected)]="roleCreate">
                  <nb-option *ngFor="let item of roles" [value]="item.id">{{item.name}}</nb-option>
              </nb-select>
          </nb-card-body>
          <nb-card-footer class="text-right">
              <button nbButton (click)="ref.close()" style="margin-right: 5px;">Cancelar</button>
              <button nbButton (click)="ref.close()" status="danger"
                  routerLink="../../setting/users/edit/{{value.data.id}}/{{roleCreate}}" [disabled]="roleCreate<1">Siguiente</button>
          </nb-card-footer>
      </nb-card>
  </ng-template>
  <ng-template #dialog2 let-data let-ref="dialogRef">
      <nb-card>
          <nb-card-header>Agregar Sede a usuario</nb-card-header>
          <nb-card-body>
              <nb-select fullWidth placeholder="Seleccione la sede" [(ngModel)]="opcionSeleccionado">
                  <nb-option *ngFor="let item of campus" [value]="item.id">{{item.name}}</nb-option>
              </nb-select>
          </nb-card-body>
          <nb-card-footer class="text-right">
              <button nbButton (click)="ref.close()" style="margin-right: 5px;">Cancelar</button>
              <button nbButton (click)="saveCampus()" status="danger">Guardar</button>
          </nb-card-footer>
      </nb-card>
  </ng-template>
  `,
})
export class ActionsUsersComponent implements ViewCell, OnInit {
  public roles: any;
  public roleCreate = 0;
  public route: string = '';
  public campus:any[]=[];
  public opcionSeleccionado;
  public selectedCampus: number;
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(private dialogService: NbDialogService,
    private campusBS: CampusService,
    private toastService: NbToastrService,
    private userCampusBS: UserCampusBusinessService) { }

  async ngOnInit() {
    this.roles = [];
    this.route =
      this.value.data.user_role.forEach(element => {
        this.roles.push(element.role);
      });
      this.campus= await this.campusBS.GetCollection();
  }

  ChangeCampus(value){
    this.selectedCampus=value;
  }

  saveCampus(){
    if (this.opcionSeleccionado!=null) {
      this.userCampusBS.Save({
        user_id: this.value.data.id,
        campus_id: this.opcionSeleccionado,
      }).then(x => {
        this.toastService.success('', x.message);
      }).catch(x => {
        throw x;
      });
    }else{
      this.toastService.success('', 'Debe seleccionar una sede');
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  open2(dialog2: TemplateRef<any>) {
    this.dialogService.open(dialog2);
  }
}
