import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ngx-ch-nutrition-input',
  templateUrl: './ch-nutrition-input.component.html',
  styleUrls: ['./ch-nutrition-input.component.scss']
})
export class ChNutritionInputComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;
  @Input() has_input: boolean = false;
  @Input() nutrition: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public weight: any = null;
  public input_done: boolean = false;
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;
  public show5 = false;
  public show6 = false;


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
  // recibe la señal de que se realizó un registro en alguna de las tablas de ingreso
  inputMessage($event) {
    if ($event == true) {
      this.messageEvent.emit(true);
    }
  }

  filterStepper($event) {
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep = this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Gastrointestinales') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Anamnesis Alimentaria') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Cálculos de Nutrición Parenteral') {
      this.show3 = true;
    } else if (selectedStep == '5' || selectedStep == 'Antecedentes') {
      this.show4 = true;
    } else if (selectedStep == '6' || selectedStep == 'Análisis e Interpretación'){
      this.show5 = true;
    } else if (selectedStep == '7' || selectedStep == 'Recomendaciones / Educación'){
      this.show6 = true;
    }
  }

}
