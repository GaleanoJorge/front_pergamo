import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {NbDialogRef} from '@nebular/theme';

@Component({
  template: `
    <nb-card style='min-width: 360px; max-width: 450px;max-height: 600px;overflow-y: hidden;'>
      <nb-card-header>
        Programas disponibles
      </nb-card-header>
      <nb-list>
        <nb-list-item *ngFor='let category of categories'>
          <div class='d-flex w-100'>
            <span style='width: 90%'>
              {{ category.name }}
            </span>
            <span>
              <nb-checkbox [disabled]="initCategories.includes(category.id) ? true : false"
                           [checked]="categoriesSelect.includes(category.id) ? true : false"
                           (checkedChange)='SelectedCategory($event, category)'></nb-checkbox>
            </span>
          </div>
        </nb-list-item>
      </nb-list>

      <nb-card-footer>
        <button type='button' nbButton (click)="close()" class="float-right">Volver</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class CategoriesDialogComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() SelectedCategory = null;
  @Input() categoriesSelect = [];
  @Input() initCategories = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
  ) {
  }

  ngOnInit(): void {
    if (!this.categoriesSelect.length) {
      this.categoriesSelect = [...this.initCategories];
    } else {
      this.categoriesSelect = [...this.categoriesSelect, ...this.initCategories];
    }
  }

  close() {
    this.dialogRef.close();
  }

}
