import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ngx-ch-nutrition-regular-note',
  templateUrl: './ch-nutrition-regular-note.component.html',
  styleUrls: ['./ch-nutrition-regular-note.component.scss']
})
export class ChNutritionRegularNoneComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() nutrition: boolean = false;


  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public weight: any = null;
  public show1 = false;
  public show2 = false;
  public show3 = false;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
  }

  receiveMessage(event) {
    if (event.name === 'weight') {
      this.weight = event.value;
    }
  }
  filterStepper($event) {
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep = this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Cálculos de Nutrición Parenteral') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Análisis e Interpretación') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Recomendaciones / Educación"') {
      this.show3 = true;
    } 
  }
}
