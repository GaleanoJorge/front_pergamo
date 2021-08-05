import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../models/session';

@Component({
  selector: 'ngx-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  @Input() sessions: Session[];

  constructor() { }

  ngOnInit(): void { }

}
