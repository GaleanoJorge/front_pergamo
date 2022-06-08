import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {Entity} from '../../../../models/entity';
import {EntityService} from '../../../../business-controller/entity.service';

@Component({
  selector: 'ngx-form-entity',
  templateUrl: './form-entity.component.html',
  styleUrls: ['./form-entity.component.scss']
})
export class FormEntityComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public status_id: number;
  public entities: Entity[];
  public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_label='Activo';
  public temp=1;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private entityBS: EntityService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        entity_parent_id:null,
        status_id: '',
        is_judicial:0,
      };
    }
    this.entityBS.GetCollection().then(x => {
      this.entities = x;
    });    
    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });    
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      entity_parent_id: [this.data.entity_parent_id],
      status_id: [this.data.status_id],
      is_judicial:[this.data.is_judicial],
    });
  }

  close() {
    this.dialogRef.close();
  }
  ChangeLabel(){
    if (this.status_label=='Activo') {
      this.status_label='Inactivo';
      this.temp=2;
    } else {
      this.status_label='Activo';
      this.temp=1;
    }
    
  }
  ChangeLabel2(){
    if (this.data.is_judicial==0) {
      this.data.is_judicial=1;
    }else{
      this.data.is_judicial=0;
    }    
  }
  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.entityBS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          entity_parent_id: this.form.controls.entity_parent_id.value,
          is_judicial: this.data.is_judicial,
          status_id: this.temp,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        
        this.entityBS.Save({
          name: this.form.controls.name.value,
          entity_parent_id: this.form.controls.entity_parent_id.value,
          is_judicial:this.data.is_judicial,
          status_id: this.temp,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
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
