import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { DashboardRoleService } from '../../../business-controller/dashboard-role.service';
import { DashboardService } from '../../../business-controller/dashboard.service';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'ngx-dashboardA',
    templateUrl: 'dashboardA.component.html',
    styleUrls: ['dashboardA.component.scss'],
})
export class DashboardAComponent {
    public currentRole;
    public dashboards_routes;
    public dashboards_roles = false;
    public dashboards = [];
    constructor(
        private reporteBS: ReportBusinessService,
        private authService: AuthService,
        private DashboardS: DashboardService,
        private DashboardRoleS: DashboardRoleService,
    ) { }

    routes = [
        {
            name: "Dashboard",
            route: "../../dashboard"
        }
    ];
    public messageError: string = null;
    public columns: string[] = [];
    public data: any[] = [];
    public show: boolean;
    public dataGraphic: any[] = [];

    ngOnInit() {
        var curr = this.authService.GetRole();
        this.currentRole = this.authService.GetUser().roles.find(x => {
            return x.id == curr;
        });

        this.DashboardS.GetCollection().then(x => {
            this.dashboards_routes = x;
        });

        this.DashboardRoleS.GetCollection({
            role_id: curr,
        }).then(x => {
            this.dashboards_roles = true;
            if (x.length > 0) {
                x.forEach(e => {
                    this.dashboards.push(e['dashboard_id']);
                });
            }
        });

        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Grupos (120)',
            description: 'Número de grupos esperados',
            labels: ["20 Actuales", "100 Faltantes"],
            series: [
                { name: "20 Actuales", value: 20 },
                { name: "100 Faltantes", value: 100 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Formadores (120)',
            description: 'Número de formadores esperados',
            labels: ["100 Actuales", "20 Faltantes"],
            series: [
                { name: "100 Actuales", value: 100 },
                { name: "20 Faltantes", value: 20 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Discentes (3.000)',
            description: 'Número de discentes esperados',
            labels: ["1.000 Actuales", "2.000 Faltantes"],
            series: [
                { name: "1.000 Actuales", value: 1000 },
                { name: "2.000 Faltantes", value: 2000 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Discentes por Género (1.000)',
            description: 'Número de discentes por género',
            labels: ["351 Hombres", "649 Mujeres"],
            series: [
                { name: "351 Hombres", value: 351 },
                { name: "649 Mujeres", value: 649 }
            ]
        });
    }

    getLink(id) {
        var a = this.dashboards_routes.find(x => {
            return x.id == id;
          }).link;
        return a;
    }
}
