import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a ngxCheckPerms="update" nbButton ghost (click)="open(dialog)">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <!--<button ngxCheckPerms="delete" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>-->
      <button ngxCheckPerms="update" nbButton ghost (click)="value.reset_password(value.data)" title="Forzar cambio de contraseña">
        <nb-icon [icon]="(value.data.force_reset_password ? 'shield-outline' : 'shield-off-outline')"></nb-icon>
      </button>
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
              <button nbButton (click)="ref.close()" status="warning" style="margin-right: 5px;"
                  routerLink="../../setting/users/extraordinary-action{{(roleCreate==2 ? '-coordinator':(roleCreate==4 ? '-former':''))}}/{{value.data.id}}/{{roleCreate}}" [disabled]="!(roleCreate==4 || roleCreate==5 || roleCreate==2)">Acciones Extraordinarias</button>
              <button nbButton (click)="ref.close()" status="danger"
                  routerLink="../../setting/users/edit/{{value.data.id}}/{{roleCreate}}" [disabled]="roleCreate<1">Siguiente</button>
          </nb-card-footer>
      </nb-card>
  </ng-template>
  `,
})
export class ActionsUsersComponent implements ViewCell, OnInit {
  public roles: any;
  public roleCreate = 0;
  public route: string = '';
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.roles = [];
    this.route =
      this.value.data.user_role.forEach(element => {
        this.roles.push(element.role);
      });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
}
