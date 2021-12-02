import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a ngxCheckPerms="update" nbButton ghost [routerLink]="'../../admissions/patient/' + value.data.id+ '/edit'">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button ngxCheckPerms="delete" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <button *ngIf="status" nbButton ghost [nbPopover]="templateRef" nbPopoverTrigger="hover">
        <nb-icon icon="info-outline"></nb-icon>
      </button>
      <a nbButton nbButton ghost [routerLink]="'../../admissions/admissions-patient/' + value.data.id" title="Admisiones">
      <nb-icon icon="list-outline"></nb-icon>
    </a>
    </div>
    <ng-template #templateRef>
    <div class="p-3">
      <p><strong>Contrato:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].contract.name }}</p>
      <p><strong>Piso:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].campus.name }}</p>
      <p><strong>Ruta de admisión:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].admission_route.name }}</p>
      <p><strong>Ambito de atención:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].scope_of_attention.name }}</p>
      <p><strong>Programa:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].program.name }}</p>
      <p><strong>Piso:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].flat.name }}</p>
      <p><strong>Pabellón:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].pavilion.name }}</p>
      <p><strong>Cama:</strong> {{ this.value.data.admissions[this.value.data.admissions.length - 1].location[this.value.data.admissions[this.value.data.admissions.length - 1].location.length - 1].bed.name }}</p>
    </div>
  </ng-template>
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public status;

  ngOnInit(){
    if(this.value.data.admissions.length==0){
      this.status=false;
    }else if (this.value.data.admissions[this.value.data.admissions.length - 1].discharge_date=='0000-00-00 00:00:00'){
      this.status=true;
    }
  }
}
