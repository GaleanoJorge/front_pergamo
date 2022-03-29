import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {CampusBriefcaseService} from '../../../business-controller/campus-briefcase.service';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      {{this.campus}}
    </div>
  `,
})
export class Actions3Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public campus_briefcase:any[];
  public campus:string;
  constructor(
    private CampusBriefcaseS: CampusBriefcaseService,
  ) {
  }
  async ngOnInit() {
      var arrdta = [];
      this.value.campus.forEach(element => {
        if (element.briefcase_id==this.value.data.id)
        arrdta.push(element.campus.name);
      });
      if(arrdta.length!=0){
        this.campus = arrdta.join();
      }else{
        this.campus = 'Sin sede';
      }
 
  }
}
