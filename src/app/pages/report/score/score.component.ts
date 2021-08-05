import { Component } from '@angular/core';

@Component({
    selector: 'ngx-report-score',
    templateUrl: 'score.component.html',
    styleUrls: ['score.component.scss'],
})
export class ScoreComponent {
    routes = [
        {
            name: "Reportes de Calificaciones",
            route: "../../report/score"
        }
    ];
}
