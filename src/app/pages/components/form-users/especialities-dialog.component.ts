import { Component, Input, OnInit} from '@angular/core';
import { AssistanceSpecial } from '../../../models/assistance-special';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card style='min-width: 360px; max-width: 450px;max-height: 600px;overflow-y: hidden;'>
      <nb-card-header>
        <div class=" row ">
          <div class="col-md-5">
            Especialidades :  
          </div> 
          <div class="col-md-7">    
          <input (change)='search($event)' class="form-control" type="text" nbInput fullWidth required minlength="4" id= "name" name placeholder="Buscar..."> 
            </div>         
        </div>     
      </nb-card-header>
      <nb-list>
        <nb-list-item *ngFor='let assistanceSpecial of specialities'>
          <div class='d-flex w-100'>
            <span style='width: 90%'>
              {{ assistanceSpecial.name }}
            </span>
            <span>
              <nb-checkbox [disabled]="initSpecialities.includes(assistanceSpecial.id) ? true : false"
                           [checked]="specialitiesSelect.includes(assistanceSpecial.id) ? true : false"
                           (checkedChange)='SelectedAssistanceSpecial($event, assistanceSpecial)'></nb-checkbox>
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
export class SpecialitiesDialogComponent implements OnInit {
  @Input() specialities: any[] = [];
  @Input() SelectedAssistanceSpecial = null;
  @Input() specialitiesSelect = [];
  @Input() initSpecialities = [];
  @Input() searchSpecialities = null;
  public specialitiesall;

  constructor(
    protected dialogRef: NbDialogRef<any>,
  ) {
  }

  ngOnInit(): void {
    if (!this.specialitiesSelect.length) {
      this.specialitiesSelect = [...this.initSpecialities];
    } else {
      this.specialitiesSelect = [...this.specialitiesSelect, ...this.initSpecialities];
    }
    this.specialitiesall= this.specialities;
  }

  filterItems(query) {
    return this.specialitiesall.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }
  

  search(value){
    this.specialities=this.filterItems(value.target.value);

  }


  close() {
    this.dialogRef.close();
  }

}
