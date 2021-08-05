import {Component, Input, OnInit} from '@angular/core';
import {EventHistoryStatusBusinessService} from '../../../business-controller/event-history-status-business.service';
import {NbDialogService} from '@nebular/theme';
import {FormEventsHistoryStatusComponent} from './form-events-history-status/form-events-history-status.component';

@Component({
  selector: 'ngx-events-histoty-status',
  templateUrl: './events-histoty-status.component.html',
  styleUrls: ['./events-histoty-status.component.scss'],
})
export class EventsHistotyStatusComponent implements OnInit {
  @Input() event_id: number;
  @Input() IsApproved = false;
  record = [];
  status = [];

  constructor(
    private eventHistoryBS: EventHistoryStatusBusinessService,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.eventHistoryBS.GetCollection({
      pagination: false,
      event_id: this.event_id,
    }).then(x => {
      this.record = x;
    });
  }

  addObservation() {
    this.dialogFormService.open(FormEventsHistoryStatusComponent, {
      context: {
        title: 'Agregar observación',
        event_id: this.event_id,
        refreshData: this.refreshData.bind(this),
      },
    });
  }

}
