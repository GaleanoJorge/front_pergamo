import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietMenuDishService } from '../../../../business-controller/diet-menu-dish.service';
import { DietOrderService } from '../../../../business-controller/diet-order.service';


@Component({
  selector: 'ngx-form-admissions',
  templateUrl: './form-admissions.component.html',
  styleUrls: ['./form-admissions.component.scss'],
})
export class FormAdmissionsComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;

  public diet_menu_type: any[];
  public diet_week: any[];
  public diet_day: any[];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public diet_order: any[];

  public dishByMenu: boolean = true;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private dietOrderS: DietOrderService,
    private toastService: NbToastrService,
    private toastS: NbToastrService,
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

    this.dietOrderS.GetCollection({ diet_menu_id: this.data.id }).then(x => {
      this.diet_order = x;
      x.forEach(element => {
        this.selectedOptions.push(element.admissions_id);
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  save() {
    this.isSubmitted = true;
    this.loading = true;
    if (this.selectedOptions2) {
      var id = this.data.id;
      var contador = 0;
      var err = 0;
      if (this.saved) {
        this.saved();
      }
      if (!this.selectedOptions.length) {
        this.toastS.danger(null, 'Debe seleccionar al menos un paciente');
      }
      else {
        this.dietOrderS.Update({
          diet_menu_id: id,
          admissions_id: JSON.stringify(this.selectedOptions),
        }, id).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          err++;
          this.isSubmitted = false;
          this.loading = false;
        });
        contador++;

        if (contador > 0) {
          this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
        } else if (err > 0) {
          this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
        }
        this.selectedOptions = [];
      }
    } else {
      var id = this.data.id;
      var contador = 0;
      var err = 0;
      if (this.saved) {
        this.saved();
      }
      if (!this.selectedOptions.length) {
        this.toastS.danger(null, 'Debe seleccionar al menos un paciente');
      }
      else {
        this.dietOrderS.Save({
          diet_menu_id: id,
          admissions_id: JSON.stringify(this.selectedOptions),
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
          err++;
        });
        contador++;
        if (contador > 0) {
          this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
        } else if (err > 0) {
          this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
        }
        this.selectedOptions = [];
      }
    }

  }


}
