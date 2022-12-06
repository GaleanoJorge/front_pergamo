import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { environment } from '../../../../environments/environment';
import { EventEmitter, Output } from '@angular/core';

export class ServerDataSourceCustom extends ServerDataSource {
  protected search = null;
  protected entity = null;
  protected customData = null;
  protected prefix = 'data.';
  protected queryParams = {}; 
  // protected onLoading = null;
  @Output() loading: EventEmitter<any> = new EventEmitter();

  constructor(
    protected http: HttpClient,
    entity: string,
    customData = null,
    conf: ServerSourceConf | {} | any = {},
    prefix: string = 'data.',
    queryParams = {}
  ) {
    super(
      http,
      (!conf.endPoint
        ? (conf.endPoint = environment.api + entity)
        : (conf.endPoint = conf.endPoint),
      !conf.dataKey
        ? (conf.dataKey = prefix + (customData ? customData : entity) + '.data')
        : (conf.dataKey = conf.dataKey),
      !conf.pagerLimitKey
        ? (conf.pagerLimitKey =
            prefix + (customData ? customData : entity) + '.per_page')
        : (conf.pagerLimitKey = conf.pagerLimitKey),
      !conf.pagerPageKey
        ? (conf.pagerPageKey =
            prefix + (customData ? customData : entity) + '.current_page')
        : (conf.pagerPageKey = conf.pagerPageKey),
      !conf.totalKey
        ? (conf.totalKey =
            prefix + (customData ? customData : entity) + '.total')
        : (conf.totalKey = conf.totalKey),
      conf)
    );
    this.entity = entity;
    this.prefix = prefix;
    this.customData = customData;
    this.queryParams = queryParams;
  }

  public updateQueryParams(queryParams) {
    this.queryParams = queryParams;
  }

  protected createRequesParams(): HttpParams {
    let httpParams = super.createRequesParams();
    httpParams = this.addSearchRequestParams(httpParams);
    this.loading.emit(true);
    return httpParams;
  }

  setSearch(value): LocalDataSource {
    this.search = value;
    this.pagingConf['page'] = 1;
    this.refresh();
    return this;
  }

  protected addSearchRequestParams(httpParams: HttpParams): HttpParams {
    if (this.search && this.search !== '') {
      httpParams = httpParams.set('search', this.search);
    }

    return httpParams;
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
    if (
      this.pagingConf &&
      this.pagingConf['page'] &&
      this.pagingConf['perPage']
    ) {
      const pagerKey = this.conf.pagerPageKey.replace(
        this.prefix + (this.customData ? this.customData : this.entity) + '.',
        ''
      );
      const pagerLimitKey = this.conf.pagerLimitKey.replace(
        this.prefix + (this.customData ? this.customData : this.entity) + '.',
        ''
      );
      httpParams = httpParams.set(pagerKey, this.pagingConf['page']);
      httpParams = httpParams.set(pagerLimitKey, this.pagingConf['perPage']);
      httpParams = httpParams.set('pagination', 'true');
    }
    // Agregando parametros adicionales
    const keysParams = Object.keys(this.queryParams);

    keysParams.map((k) => {
      httpParams = httpParams.set(k, this.queryParams[k]);
    });

    return httpParams;
  }

  public getTotal() {
    return this.lastRequestCount;
  }

  public get pageConfig() {
    return this.pagingConf;
  }
}
