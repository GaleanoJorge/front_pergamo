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
      this.input_done = true;
    }

}
