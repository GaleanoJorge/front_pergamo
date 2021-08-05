import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AutocompleteRemoteBussinessService} from '../../../business-controller/autocomplete-remote-bussiness.service';

@Component({
  selector: 'ngx-autocomplete-remote',
  templateUrl: './autocomplete-remote.component.html',
  styleUrls: ['./autocomplete-remote.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteRemoteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteRemoteComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Buscar...';
  @Input() label: string | Function = 'label';
  @Input() value = 'value';
  @Input() url = null;
  @Input() returnData = null;
  @Input() minSearch = 2;
  @Input() initValue = null;
  @Input() status = null;
  @Input() pagination = true;
  @Input() params = null;
  @Input() fullWidth = true;
  loading = false;

  notFound = false;
  isFocus = false;
  options: any[] = [];

  searchControl = new FormControl();
  onChange = (_: any) => {};
  onTouch = () => {};

  CURRENT_PAGE = 1;
  PER_PAGE = 10;

  @ViewChild('autoInput') input;

  constructor(
    private autocompleteBS: AutocompleteRemoteBussinessService,
  ) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(value => {
        this.notFound = false;
        if (typeof value === 'string' && value.length >= this.minSearch) {
          this.search(value);
        } else {
          this.setOptions([]);
        }
      });
  }

  private search(value) {
    this.loading = true;
    let params = {
      current_page: this.CURRENT_PAGE,
      per_page: this.PER_PAGE,
      search: value,
      pagination: this.pagination,
    };

    if (this.params && typeof this.params === 'function') {
      params = {
        ...params,
        ...this.params(),
      };
    } else if (this.params) {
      params = {
        ...params,
        ...this,
      };
    }

    this.autocompleteBS.run(this.url, params).then(x => {
      if (this.returnData && this.pagination) {
        this.options = x[this.returnData].data;
      } else if (this.returnData) {
        this.options = x[this.returnData];
      } else {
        this.options = x;
      }


      if (!this.options.length) {
        this.notFound = true;
      }
      this.loading = false;
    }).catch(e => {
      this.loading = false;
    });
  }

  get showMinSearchText() {
    const value = this.searchControl.value ?? '';

    return !this.loading && typeof value === 'string'
      && value.length < this.minSearch && this.isFocus;
  }

  onSelectionChange($event) {
    this.setValue($event);
  }

  public setOptions(options) {
    this.options = options;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  async writeValue(value: string) {
    if (!this.initValue && value) {
      setTimeout(() => {
        this.input.nativeElement.value = value;
      }, 500);

    } else if (value) {
      this.loading = true;
      const data = await this.initValue(value);
      this.setValue(data);
      this.loading = false;
    } else if (value === '') {
      setTimeout(() => {
        this.input.nativeElement.value = value;
        this.onTouch();
        this.onChange(value);
      }, 500);
    }
  }

  setValue(data) {
    const label = this.renderLabel(data);
    this.input.nativeElement.value = label;
    this.onTouch();
    this.onChange(data);
  }

  onFocus() {
    this.isFocus = true;
  }

  onBlur() {
    this.isFocus = false;
  }

  renderLabel(value) {
    if (typeof this.label === 'string') {
      return value[this.label];
    } else if (typeof this.label === 'function') {
      return this.label(value);
    }
  }
}
