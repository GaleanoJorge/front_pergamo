import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      {{this.days}}
    </div>
  `,
})
export class ActionsDaysComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public days:string;

  constructor() {
  }

  async ngOnInit() {
      var arrdta = [];
      this.value.days.forEach(element => {
        if (element.medical_diary_id==this.rowData.id)
        arrdta.push(element.days.name);
      });
      let result2 = arrdta.filter((item, index) => {
        return arrdta.indexOf(item) === index;
      })
      if(result2.length!=0){
        this.days = result2.join();
      }else{
        this.days = 'Sin días';
      }
 
  }
}
