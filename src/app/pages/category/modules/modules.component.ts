import { Component, OnInit, Input } from '@angular/core';
import { ModuleBusinessService } from '../../../business-controller/module-business.service';

@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  @Input() idCourse: number;

  public messageError: string = null;

  constructor(public moduleBS: ModuleBusinessService) { }

  ngOnInit(): void {
    this.moduleBS.GetCollection(this.idCourse).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

}
