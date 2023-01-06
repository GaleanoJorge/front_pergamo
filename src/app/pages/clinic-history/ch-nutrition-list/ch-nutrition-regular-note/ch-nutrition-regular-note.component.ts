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
}
