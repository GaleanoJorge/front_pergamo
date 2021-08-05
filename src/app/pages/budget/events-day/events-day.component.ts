import {Component, Input, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {FormEventsDayComponent} from './form-events-day/form-events-day.component';
import {EventDayBusinessService} from '../../../business-controller/event-day-business.service';

@Component({
  selector: 'ngx-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.scss'],
})
export class EventsDayComponent implements OnInit {
  @Input() event_id: number;
  @Input() conceptTypes = [];
  @Input() municipality_id: number;
  @Input() IsApproved = false;

  loading = true;
  events_day = [];
  total_special = 0;
  total_days = [];

  constructor(
    private dialogFormService: NbDialogService,
    private eventDayBS: EventDayBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addDay() {
    this.dialogFormService.open(FormEventsDayComponent, {
      context: {
        title: 'Crear día',
        event_id: this.event_id,
        saved: this.refreshData.bind(this),
      },
    });
  }

  refreshData() {
    this.loading = true;
    this.eventDayBS.GetCollection({
      event_id: this.event_id,
      pagination: false,
    }).then(x => {
      this.events_day = x;
      this.loading = false;
    });
  }

  calculateTotalSpecial(value) {
    this.total_special = value;
  }

  calculateTotalDays(value, index) {
    this.total_days[index] = value;
  }

  get totalDays() {
    let total = 0;

    this.total_days.map(tot => {
      total += tot;
    });
    return total;
  }
}
