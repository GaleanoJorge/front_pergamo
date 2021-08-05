import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ModuleBusinessService } from '../../../../business-controller/module-business.service';
import { Module } from '../../../../models/module';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { SessionBusinessService } from '../../../../business-controller/session-business.service';
import { log } from 'console';

@Component({
  selector: 'ngx-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss'],
})
export class FormSessionComponent implements OnInit {
  @Input() course_id: number = null;
  @Input() group_id: number = null;
  @Input() refreshSession;
  @Input() data = {
    id: null,
    module_id: '',
    user_role_category_inscription: [],
    group_id: this.group_id,
    name: '',
    description: '',
    teams_url: '',
    session_date: '',
    start_time: '',
    closing_time: '',
    start: '',
    closing: '',
  };

  public form: FormGroup;
  public isSubmitted = false;
  public modules: Module[] = [];
  public trainers = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: NbDialogRef<any>,
    private toastService: NbToastrService,
    private moduleBS: ModuleBusinessService,
    private userBS: UserBusinessService,
    private sessionBs: SessionBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      module_id: [this.data.module_id, Validators.compose([Validators.required])],
      user_role_category_inscription: [
        this.data.user_role_category_inscription.map(m => m.id),
        // Validators.compose([Validators.required]),
      ],
      group_id: [this.group_id, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      teams_url: [this.data.teams_url],
      description: [this.data.description, Validators.compose([Validators.required])],
      session_date: [this.data.session_date, Validators.compose([Validators.required])],
      start_time: [this.data.start, Validators.compose([Validators.required])],
      closing_time: [this.data.closing, Validators.compose([Validators.required])],
    });

    this.moduleBS.GetByCourse(this.course_id).then(x => {
      this.modules = x;
    });

    this.userBS.GetTrainersByCourse(this.course_id).then(x => {
      this.trainers = x;
    });
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (this.form.value.start_time < this.form.value.closing_time) {
      if (!this.form.invalid) {
        try {
          let x;
          if (this.data.id) {
            x = await this.sessionBs.Update({
              ...this.form.value,
              id: this.data.id,
            });
          } else {
            x = await this.sessionBs.Save(this.form.value);
          }
          if (x.status) {
            this.toastService.success(null, x.message);
            this.refreshSession();
            this.close();
          }
        } catch (e) {
        }
      }
    } else {
      this.toastService.danger(null, "Revise las horas de inicio y fin");
    }
  }
}
