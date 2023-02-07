import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-ch-record-select',
  templateUrl: './ch-record-select.component.html',
  styleUrls: ['./ch-record-select.component.scss'],
})
export class ChRecordSelectComponent implements OnInit {
  @Input() title: string;
  @Input() executeAction: any = null;
  @Input() textConfirm;
  public data: any = null;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public specialty_id: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.data = {
      specialty_id: '',
    };
    this.form = this.formBuilder.group({
      specialty_id: [this.data.specialty_id,
      Validators.compose([Validators.required])]
    });
    let userData = JSON.parse(localStorage.getItem('user'));
    this.specialty_id = userData.assistance[0].assistance_special.map(element => { return element.specialty });
  }

  close() {
    this.dialogRef.close();
  }

  CreateAction() {
    if (!this.form.invalid) {
      this.executeAction(this.form.controls.specialty_id.value);
      this.close();
    }
  }
}
