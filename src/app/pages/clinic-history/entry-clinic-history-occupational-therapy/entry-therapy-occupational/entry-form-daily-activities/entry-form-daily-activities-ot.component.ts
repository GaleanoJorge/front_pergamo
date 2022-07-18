import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEDailyActivitiesOTService } from '../../../../../business-controller/ch_e_daily_activities_o_t.service';




@Component({
  selector: 'ngx-entry-form-daily-activities-ot',
  templateUrl: './entry-form-daily-activities-ot.component.html',
  styleUrls: ['./entry-form-daily-activities-ot.component.scss']
})
export class EntryFormDailyActivitiesOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;



  constructor(
    private formBuilder: FormBuilder,
    private ChEDailyActivitiesOTService: ChEDailyActivitiesOTService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        cook: '',
        kids: '',
        wash: '',
        game: '',
        ironing: '',
        walk: '',
        clean: '',
        sport: '',
        decorate: '',
        social: '',
        act_floristry: '',
        friends: '',
        read: '',
        politic: '',
        view_tv: '',
        religion: '',
        write: '',
        look: '',
        arrange: '',
        travel: '',
        observation_activity: '',
        test: '',
        observation_test: '',
      };
    }





    this.form = this.formBuilder.group({
      cook: [this.data[0] ? this.data[0].cook : this.data.cook, Validators.compose([Validators.required])],
      kids: [this.data[0] ? this.data[0].kids : this.data.kids, Validators.compose([Validators.required])],
      wash: [this.data[0] ? this.data[0].wash : this.data.wash, Validators.compose([Validators.required])],
      game: [this.data[0] ? this.data[0].game : this.data.game, Validators.compose([Validators.required])],
      ironing: [this.data[0] ? this.data[0].ironing : this.data.ironing, Validators.compose([Validators.required])],
      walk: [this.data[0] ? this.data[0].walk : this.data.walk, Validators.compose([Validators.required])],
      clean: [this.data[0] ? this.data[0].clean : this.data.clean, Validators.compose([Validators.required])],
      sport: [this.data[0] ? this.data[0].sport : this.data.sport, Validators.compose([Validators.required])],
      decorate: [this.data[0] ? this.data[0].decorate : this.data.decorate, Validators.compose([Validators.required])],
      social: [this.data[0] ? this.data[0].social : this.data.social, Validators.compose([Validators.required])],
      act_floristry: [this.data[0] ? this.data[0].act_floristry : this.data.act_floristry, Validators.compose([Validators.required])],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends, Validators.compose([Validators.required])],
      read: [this.data[0] ? this.data[0].read : this.data.read, Validators.compose([Validators.required])],
      politic: [this.data[0] ? this.data[0].politic : this.data.politic, Validators.compose([Validators.required])],
      view_tv: [this.data[0] ? this.data[0].view_tv : this.data.view_tv, Validators.compose([Validators.required])],
      religion: [this.data[0] ? this.data[0].religion : this.data.religion, Validators.compose([Validators.required])],
      write: [this.data[0] ? this.data[0].write : this.data.write, Validators.compose([Validators.required])],
      look: [this.data[0] ? this.data[0].look : this.data.look, Validators.compose([Validators.required])],
      arrange: [this.data[0] ? this.data[0].arrange : this.data.arrange, Validators.compose([Validators.required])],
      travel: [this.data[0] ? this.data[0].travel : this.data.travel, Validators.compose([Validators.required])],
      observation_activity: [this.data[0] ? this.data[0].observation_activity : this.data.observation_activity,],
      test: [this.data[0] ? this.data[0].test : this.data.test, Validators.compose([Validators.required])],
      observation_test: [this.data[0] ? this.data[0].observation_test : this.data.observation_test,],
    });

    if (this.data.cook != '') {
      this.form.controls.cook.disable();
      this.form.controls.kids.disable();
      this.form.controls.wash.disable();
      this.form.controls.game.disable();
      this.form.controls.ironing.disable();
      this.form.controls.walk.disable();
      this.form.controls.clean.disable();
      this.form.controls.sport.disable();
      this.form.controls.decorate.disable();
      this.form.controls.social.disable();
      this.form.controls.act_floristry.disable();
      this.form.controls.friends.disable();
      this.form.controls.read.disable();
      this.form.controls.politic.disable();
      this.form.controls.view_tv.disable();
      this.form.controls.religion.disable();
      this.form.controls.write.disable();
      this.form.controls.look.disable();
      this.form.controls.arrange.disable();
      this.form.controls.travel.disable();
      this.form.controls.observation_activity.disable();
      this.form.controls.test.disable();
      this.form.controls.observation_test.disable();
      this.disabled = true;
    } else {
      this.form.controls.cook.enable();
      this.form.controls.kids.enable();
      this.form.controls.wash.enable();
      this.form.controls.game.enable();
      this.form.controls.ironing.enable();
      this.form.controls.walk.enable();
      this.form.controls.clean.enable();
      this.form.controls.sport.enable();
      this.form.controls.decorate.enable();
      this.form.controls.social.enable();
      this.form.controls.act_floristry.enable();
      this.form.controls.friends.enable();
      this.form.controls.read.enable();
      this.form.controls.politic.enable();
      this.form.controls.view_tv.enable();
      this.form.controls.religion.enable();
      this.form.controls.write.enable();
      this.form.controls.look.enable();
      this.form.controls.arrange.enable();
      this.form.controls.travel.enable();
      this.form.controls.observation_activity.enable();
      this.form.controls.test.enable();
      this.form.controls.observation_test.enable();
      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChEDailyActivitiesOTService.Update({
          id: this.data.id,
          cook: this.form.controls.cook.value,
          kids: this.form.controls.kids.value,
          wash: this.form.controls.wash.value,
          game: this.form.controls.game.value,
          ironing: this.form.controls.ironing.value,
          walk: this.form.controls.walk.value,
          clean: this.form.controls.clean.value,
          sport: this.form.controls.sport.value,
          decorate: this.form.controls.decorate.value,
          social: this.form.controls.social.value,
          act_floristry: this.form.controls.act_floristry.value,
          friends: this.form.controls.friends.value,
          read: this.form.controls.read.value,
          politic: this.form.controls.politic.value,
          view_tv: this.form.controls.view_tv.value,
          religion: this.form.controls.religion.value,
          write: this.form.controls.write.value,
          look: this.form.controls.look.value,
          arrange: this.form.controls.arrange.value,
          travel: this.form.controls.travel.value,
          observation_activity: this.form.controls.observation_activity.value,
          test: this.form.controls.test.value,
          observation_test: this.form.controls.observation_test.value,
          
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChEDailyActivitiesOTService.Save({
          cook: this.form.controls.cook.value,
          kids: this.form.controls.kids.value,
          wash: this.form.controls.wash.value,
          game: this.form.controls.game.value,
          ironing: this.form.controls.ironing.value,
          walk: this.form.controls.walk.value,
          clean: this.form.controls.clean.value,
          sport: this.form.controls.sport.value,
          decorate: this.form.controls.decorate.value,
          social: this.form.controls.social.value,
          act_floristry: this.form.controls.act_floristry.value,
          friends: this.form.controls.friends.value,
          read: this.form.controls.read.value,
          politic: this.form.controls.politic.value,
          view_tv: this.form.controls.view_tv.value,
          religion: this.form.controls.religion.value,
          write: this.form.controls.write.value,
          look: this.form.controls.look.value,
          arrange: this.form.controls.arrange.value,
          travel: this.form.controls.travel.value,
          observation_activity: this.form.controls.observation_activity.value,
          test: this.form.controls.test.value,
          observation_test: this.form.controls.observation_test.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


