import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnDestroy, OnInit {

  @Input() dataGraphic: any;
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) { }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      // Add new specific colors 
      let newColors = config.variables;
      newColors.successLight = '#F15A24';
      newColors.dangerLight = '#FBB03B';
      const colors: any = newColors;      

      if (this.dataGraphic.type == 'bar') {
        this.setColors(config.variables);
        const chartjs: any = config.variables.chartjs;
        this.data = this.dataGraphic;

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      }
      if (this.dataGraphic.type == 'radar') {
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.danger, colors.warning],
          tooltip: {},
          legend: {
            data: this.dataGraphic.labels,
            textStyle: {
              color: echarts.textColor,
            },
          },
          radar: {
            name: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            indicator: this.dataGraphic.indicator,
            splitArea: {
              areaStyle: {
                color: 'transparent',
              },
            },
          },
          series: [
            {
              name: '',
              type: 'radar',
              data: this.dataGraphic.datasets,
            },
          ],
        };
      }
      if (this.dataGraphic.type == "line") {
        const chartjs: any = config.variables.chartjs;
        this.dataGraphic.datasets[0].backgroundColor = NbColorHelper.hexToRgbA(colors.primary, 0.3);
        this.dataGraphic.datasets[0].borderColor = colors.primary;

        this.data = {
          labels: this.dataGraphic.categories,
          datasets: this.dataGraphic.datasets,
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      }
      if (this.dataGraphic.type == "pie") {
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.successLight, colors.dangerLight, colors.success, colors.danger, colors.warningLight, colors.infoLight, colors.primaryLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.dataGraphic.labels,
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Ítem',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.dataGraphic.series,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      }
    });
  }

  setColors(colors) {
    var cont = 0;
    var optColors = [
      colors.primaryLight,
      colors.dangerLight,
      colors.successLight,
      colors.infoLight,
      colors.primary,
      colors.danger,
      colors.success,
      colors.info,
    ];
    this.dataGraphic.datasets.forEach(element => {
      cont = cont > 7 ? 0 : cont;
      element.backgroundColor = optColors[cont];
      element.borderColor = optColors[cont];
      cont++;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}