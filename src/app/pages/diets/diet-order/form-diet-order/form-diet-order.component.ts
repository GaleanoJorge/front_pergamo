import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietMenuDishService } from '../../../../business-controller/diet-menu-dish.service';


@Component({
  selector: 'ngx-form-diet-order',
  templateUrl: './form-diet-order.component.html',
  styleUrls: ['./form-diet-order.component.scss'],
})
export class FormDietOrderComponent implements OnInit {
  @Input() title: string;
  @Input() data: any =null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;

  public diet_menu_type: any[];
  public diet_week: any[];
  public diet_day: any[];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public diet_menu_dish: any[];

  public dishByMenu: boolean = true;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private dietMenuDishS: DietMenuDishService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        diet_consistency_id: '',
        diet_menu_type_id: '',
        diet_week_id: '',
        diet_day_id: '',
      };
    }

    this.dietMenuDishS.GetCollection({ diet_menu_id: this.data.id }).then(x => {
      this.diet_menu_dish = x;
      x.forEach(element => {
        this.selectedOptions2.push(element.diet_dish_id);
      });
    });


  }

  close() {
    this.dialogRef.close();
  }


}
