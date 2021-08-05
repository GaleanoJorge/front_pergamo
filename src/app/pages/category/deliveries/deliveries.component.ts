import { Component, OnInit, Input } from '@angular/core';
import { Delivery } from '../../../models/delivery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  @Input() deliveries: Delivery[] = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void { }

  PrettyDate(date: Date) {
    return this.datePipe.transform(this.deliveries[0].created_at, 'h:mm:ss a')
      + " / " + this.datePipe.transform(this.deliveries[0].created_at, 'dd-MM-yyyy');
  }

}
