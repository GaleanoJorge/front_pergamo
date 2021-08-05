import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventBusinessService} from '../../../../business-controller/event-business.service';

@Component({
  selector: 'ngx-resume-event-executed',
  templateUrl: './resume-event-executed.component.html',
  styleUrls: ['./resume-event-executed.component.scss'],
})
export class ResumeEventExecutedComponent implements OnInit {
  @Input() event_id = null;
  @Output() setData = new EventEmitter<any>();

  data = null;
  loading = true;

  constructor(
    private eventBS: EventBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.eventBS.GetOne(this.event_id).then(x => {
      this.data = x;
      this.loading = false;
      this.setData.emit(x);
    });
  }

}
