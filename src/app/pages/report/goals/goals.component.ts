import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GoalBusinessService } from '../../../business-controller/goal-business.service';

@Component({
  selector: 'ngx-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  constructor(public goalBS: GoalBusinessService) { }

  source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public show: boolean;

  public settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'string'
      },
      name: {
        title: 'Nombre',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      unit: {
        title: 'Unidad',
        type: 'string',
      }
    }
  };

  ngOnInit() {
    this.goalBS.GetCollection().then(x => {
      this.data = [];
      x.forEach(element => {
        this.data.push({
          id: element.id,
          name: element.name,
          description: element.description,
          unit: element.unit.name + ' ' + element.unit.symbol
        });
      });
      this.source.load(this.data);
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

}
