import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompetitionBusinessService} from '../../../../business-controller/competition-business.service';

@Component({
  selector: 'ngx-form-competition',
  templateUrl: './form-competition.component.html',
  styleUrls: ['./form-competition.component.scss']
})
export class FormCompetitionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private competitionBS: CompetitionBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        description: '',     
      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.competitionBS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
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
        this.competitionBS.Save({
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
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
