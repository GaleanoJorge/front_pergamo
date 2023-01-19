import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEDailyActivitiesOTService } from '../../../../../../business-controller/ch_e_daily_activities_o_t.service';
import { Item } from '../../../../../../models/item';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'ngx-form-daily-activities-ot',
  templateUrl: './form-daily-activities-ot.component.html',
  styleUrls: ['./form-daily-activities-ot.component.scss']
})
export class FormDailyActivitiesOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public cont = 0;



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

    if (this.has_input) {
      this.ChEDailyActivitiesOTService.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          cook: [this.data[0] ? this.data[0].cook : this.data.cook,],
          kids: [this.data[0] ? this.data[0].kids : this.data.kids,],
          wash: [this.data[0] ? this.data[0].wash : this.data.wash,],
          game: [this.data[0] ? this.data[0].game : this.data.game,],
          ironing: [this.data[0] ? this.data[0].ironing : this.data.ironing,],
          walk: [this.data[0] ? this.data[0].walk : this.data.walk,],
          clean: [this.data[0] ? this.data[0].clean : this.data.clean,],
          sport: [this.data[0] ? this.data[0].sport : this.data.sport,],
          decorate: [this.data[0] ? this.data[0].decorate : this.data.decorate,],
          social: [this.data[0] ? this.data[0].social : this.data.social,],
          act_floristry: [this.data[0] ? this.data[0].act_floristry : this.data.act_floristry,],
          friends: [this.data[0] ? this.data[0].friends : this.data.friends,],
          read: [this.data[0] ? this.data[0].read : this.data.read,],
          politic: [this.data[0] ? this.data[0].politic : this.data.politic,],
          view_tv: [this.data[0] ? this.data[0].view_tv : this.data.view_tv,],
          religion: [this.data[0] ? this.data[0].religion : this.data.religion,],
          write: [this.data[0] ? this.data[0].write : this.data.write,],
          look: [this.data[0] ? this.data[0].look : this.data.look,],
          arrange: [this.data[0] ? this.data[0].arrange : this.data.arrange,],
          travel: [this.data[0] ? this.data[0].travel : this.data.travel,],
          observation_activity: [this.data[0] ? this.data[0].observation_activity : this.data.observation_activity,],
          test: [this.data[0] ? this.data[0].test : this.data.test,],
          observation_test: [this.data[0] ? this.data[0].observation_test : this.data.observation_test,],
        });
      });
    }





    this.form = this.formBuilder.group({
      cook: [this.data[0] ? this.data[0].cook : this.data.cook],
      kids: [this.data[0] ? this.data[0].kids : this.data.kids],
      wash: [this.data[0] ? this.data[0].wash : this.data.wash],
      game: [this.data[0] ? this.data[0].game : this.data.game],
      ironing: [this.data[0] ? this.data[0].ironing : this.data.ironing],
      walk: [this.data[0] ? this.data[0].walk : this.data.walk],
      clean: [this.data[0] ? this.data[0].clean : this.data.clean],
      sport: [this.data[0] ? this.data[0].sport : this.data.sport],
      decorate: [this.data[0] ? this.data[0].decorate : this.data.decorate],
      social: [this.data[0] ? this.data[0].social : this.data.social],
      act_floristry: [this.data[0] ? this.data[0].act_floristry : this.data.act_floristry],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends],
      read: [this.data[0] ? this.data[0].read : this.data.read],
      politic: [this.data[0] ? this.data[0].politic : this.data.politic],
      view_tv: [this.data[0] ? this.data[0].view_tv : this.data.view_tv],
      religion: [this.data[0] ? this.data[0].religion : this.data.religion],
      write: [this.data[0] ? this.data[0].write : this.data.write],
      look: [this.data[0] ? this.data[0].look : this.data.look],
      arrange: [this.data[0] ? this.data[0].arrange : this.data.arrange],
      travel: [this.data[0] ? this.data[0].travel : this.data.travel],
      observation_activity: [this.data[0] ? this.data[0].observation_activity : this.data.observation_activity,],
      test: [this.data[0] ? this.data[0].test : this.data.test],
      observation_test: [this.data[0] ? this.data[0].observation_test : this.data.observation_test,],
    });

  }

  save() {
    this.isSubmitted = true;
    var count = 0;
    var e = Object.entries(this.form.value).map(entry => {
      let obj_aux = {
        key: entry[0],
        value: String(entry[1])
      }
      if(obj_aux.value == ""){
        count++
      } 

      return obj_aux;
    });

    if(e.length == count) this.form.setErrors({ 'incorrect': true });

    /**
     * Generar formdata dinamico
     *     var formData = new FormData();
     * var data = this.form.controls;
     * e.forEach(Item => {formData.append(Item.key, Item.value);});
     */

    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.ChEDailyActivitiesOTService.Update({
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
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({
            cook: '', kids: '', wash: '', game: '', ironing: '',
            walk: '', clean: '', sport: '', decorate: '', social: '', act_floristry: '', friends: '',
            read: '', politic: '', view_tv: '', religion: '', write: '', look: '', arrange: '',
            travel: '', observation_activity: '', test: '', observation_test: ''
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.ChEDailyActivitiesOTService.Save({
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
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({
            cook: '', kids: '', wash: '', game: '', ironing: '',
            walk: '', clean: '', sport: '', decorate: '', social: '', act_floristry: '', friends: '',
            read: '', politic: '', view_tv: '', religion: '', write: '', look: '', arrange: '',
            travel: '', observation_activity: '', test: '', observation_test: ''
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    } else {
      this.toastService.warning('','Debe seleccionar al menos una opción');
    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}