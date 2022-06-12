import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'ngx-ch-nutrition-input',
  templateUrl: './ch-nutrition-input.component.html',
  styleUrls: ['./ch-nutrition-input.component.scss']
})
export class ChNutritionInputComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;


  constructor(

  ) {
  }

  ngOnInit(): void {
  }

}
