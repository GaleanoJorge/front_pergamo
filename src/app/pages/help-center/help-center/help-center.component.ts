import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { DashboardRoleService } from '../../../business-controller/dashboard-role.service';
import { DashboardService } from '../../../business-controller/dashboard.service';
import { ReportBusinessService } from '../../../business-controller/report-business.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'ngx-help-center',
    templateUrl: 'help-center.component.html',
    styleUrls: ['help-center.component.scss'],
})
export class HelpCenterComponent {
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
            name: "help-center",
            route: "../../help-center"
        }
    ];
    public messageError: string = null;
    public columns: string[] = [];
    public data: any[] = [];
    public show: boolean;
    public dataGraphic: any[] = [];

    ngOnInit() {
        
    }


}
