import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../models/activity';

@Component({
  selector: 'ngx-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  @Input() activities: Activity[] = [];

  constructor() { }

  ngOnInit(): void { }

}
