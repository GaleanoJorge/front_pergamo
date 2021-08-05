import {Component, Input, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import {ServerDataSourceCustom} from './server-data-source-custom';
import {HttpClient} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'ngx-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit, OnDestroy {

  @Input() settings: any;
  @Input() source = null;
  @Input() searchable: boolean = true;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() pagination: any = null;
  @Input() entity: string = null;
  @Input() debounceSearch: number = 600;
  @Input() customData: string = null;
  @Input() queryParams = {};
  @Input() messageToltip: string = '';
  @Input() showFooter: boolean = true;
  @Input() showSearch: boolean = true;
  search: string = '';
  @Output()
  propagar = new EventEmitter<any[]>();


  modelSearchChanged: Subject<string> = new Subject<string>();
  modelSearchChangedSubscription: Subscription;
  loading = false;
  public selectedRows = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.modelSearchChangedSubscription = this.modelSearchChanged.pipe(
      debounceTime(this.debounceSearch),
      distinctUntilChanged()).subscribe(model => {
      this.source.setSearch(model);
    });

    if (!this.source && !this.entity) {
      throw Error('Debe configurarse una entidad o un data source');
    }

    /*Iniciando el source*/
    if (!this.source && this.entity) {
      this.initSource();
    }

    this.configSettigs();
  }

  public configSettigs() {
    /*Opciones por defecto para configurar la tabla*/
    if (!this.settings.noDataMessage) {
      this.settings.noDataMessage = 'No se ha encontrado información';
    }

    if (!this.settings.hasOwnProperty('actions')) {
      this.settings.actions = false;
    }

    if (!this.settings.hasOwnProperty('hideSubHeader')) {
      this.settings.hideSubHeader = true;
    }

    const keys = Object.keys(this.settings.columns);

    keys.map(key => {
      if (!this.settings.columns[key].hasOwnProperty('filter')) {
        this.settings.columns[key].filter = false;
      }

      if (key === 'actions' && !this.settings.columns[key].hasOwnProperty('width')) {
        this.settings.columns[key].width = '5%';
      }
    });

    /*Opciones de paginación*/
    if (!this.settings.hasOwnProperty('pager') && !this.pagination) {
      this.settings.pager = {
        display: true,
        perPage: 10,
      };
    } else if (this.pagination) {
      this.settings.pager = this.pagination;
    }
  }

  public setSettings(settings) {
    this.settings = settings;
    this.configSettigs();
  }

  refresh(queryParams = null) {
    if (queryParams) {
      this.queryParams = queryParams;
      this.source.updateQueryParams(queryParams);
    }

    this.source.refresh();
  }

  changeEntity(entity) {
    this.entity = entity;
    this.initSource();
  }

  onUserRowSelect($event) {
    this.selectedRows = $event.selected;
    this.propagar.emit(this.selectedRows);
  }

  initSource() {
    this.source = new ServerDataSourceCustom(this.http, this.entity, this.customData, {}, 'data.', this.queryParams);
    this.source.loading.subscribe((e) => {
      setTimeout(() => {
        this.loading = true;
      });
    });
    this.source.onChangedSource.subscribe(e => {
      setTimeout(() => {
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.modelSearchChangedSubscription.unsubscribe();
  }

  getTotal() {
    if (this.source.getTotal)
      return this.source.getTotal();
    else
      return 0;
  }

  get currentPage() {
    return this.source.pageConfig.page;
  }

  get hasPagination() {
    return this.source.pageConfig.perPage < this.getTotal();
  }

  get totalPage() {
    return Math.ceil(this.getTotal() / this.source.pageConfig.perPage);
  }

}
