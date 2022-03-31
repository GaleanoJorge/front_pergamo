import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietSuppliesOutputService } from '../../../../business-controller/diet-supplies-output.service';
import { DietSuppliesOutputMenuService } from '../../../../business-controller/diet-supplies-output-menu.service';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { CampusService } from '../../../../business-controller/campus.service';


@Component({
  selector: 'ngx-form-diet-supplies-output',
  templateUrl: './form-diet-supplies-output.component.html',
  styleUrls: ['./form-diet-supplies-output.component.scss']
})
export class FormDietSuppliesOutputComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() show: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  public diet_supplies_output_menu: any[];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public campus: any[];
  public parentData;

  public showMenus = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietSuppliesOutput: DietSuppliesOutputService,
    private toastService: NbToastrService,
    private dietSuppliesOutputMenuS: DietSuppliesOutputMenuService,
    private toastS: NbToastrService,
    private campusS: CampusService,
  ) {
  }

  ngOnInit(): void {
    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
      };
    if (!this.data) {
      this.data = {
        id: '',
        campus_id: '',
      };
      this.parentData.entity = 'diet_menu';
      this.parentData.customData = 'diet_menu';
    } else {
      this.parentData.entity = 'diet_supplies_output_menu?diet_supplies_output_id=' + this.data.id;
      this.parentData.customData = 'diet_supplies_output_menu';
    }
    if (this.show) {
      this.showMenus = true;
    }

    this.dietSuppliesOutputMenuS.GetCollection({ diet_supplies_output_id: this.data.id }).then(x => {
      this.parentData.selectedOptions = x;
    });

    this.campusS.GetCollection().then(x => {
      this.campus = x;
    });

    this.form = this.formBuilder.group({
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
    });
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un menú', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0) {
            valid_values = false;
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;
        if (this.data.id) {
          this.DietSuppliesOutput.Update({
            id: this.data.id,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_supplies_output.id;
            var contador = 0;
            var err = 0;
            this.dietSuppliesOutputMenuS.Update({
              diet_supplies_output_id: id,
              amount: 5,
              diet_menu_id: JSON.stringify(this.selectedOptions),
            }, id).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;
            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {

          this.DietSuppliesOutput.Save({
            campus_id: this.form.controls.campus_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_supplies_output.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            else {
              this.dietSuppliesOutputMenuS.Save({
                diet_supplies_output_id: id,
                amount: this.form.controls.campus_id.value,
                diet_menu_id: JSON.stringify(this.selectedOptions),
              }).then(x => {
              }).catch(x => {
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
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }
  }

}
