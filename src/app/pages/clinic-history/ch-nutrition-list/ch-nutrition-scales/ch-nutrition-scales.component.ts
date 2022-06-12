import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'ngx-ch-nutrition-scales',
  templateUrl: './ch-nutrition-scales.component.html',
  styleUrls: ['./ch-nutrition-scales.component.scss']
})
export class ChNutritionScalesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;

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
