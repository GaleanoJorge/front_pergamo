import { Component } from '@angular/core';

@Component({
    selector: 'ngx-report-competition',
    templateUrl: 'competition.component.html',
    styleUrls: ['competition.component.scss'],
})
export class CompetitionComponent {
    routes = [
        {
            name: "Reportes de Competencias",
            route: "../../report/competition"
        }
    ];
}
