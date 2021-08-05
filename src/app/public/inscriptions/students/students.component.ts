import { Component, OnInit } from '@angular/core';
import { CardProgramComponent } from '../card-program.component';

@Component({
  selector: 'ngx-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public settings = {
    columns: {
      start_date: {
        title: 'Curso',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            // 'edit': this.EditSectional.bind(this),
            // 'delete': this.DeleteConfirmSectional.bind(this),
          };
        },
        renderComponent: CardProgramComponent,
      },
    },
  };

}
