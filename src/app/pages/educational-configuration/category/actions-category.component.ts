import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <!--<a nbButton ghost routerLink="/pages/educationalconfiguration/origin/{{ value.data.origin_id }}/category/{{ value.data.id }}/edit">-->
      <a nbButton ghost routerLink="/pages/educationalconfiguration/category/edit/{{ value.data.id }}">  
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbButton ghost routerLink="/pages/course/list/{{ value.data.id }}" title="Ver cursos">  
      <nb-icon icon="list-outline"></nb-icon>
    </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsCategoryComponent implements ViewCell {
  @Input() value: any;
  @Input() rowData: any;
}
