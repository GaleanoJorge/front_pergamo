import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ngx-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {

  @Input() options: any[] = [];
  @Input() label = 'label';
  @Input() value = 'value';
  @Input() inputModel: string = null;
  @Input() disabled = '';
  @Input() placeholder = '';

  @Output() inputModelChange = new EventEmitter<any>();

  filteredOptions$: Observable<any[]>;
  isClear = true;

  @ViewChild('autoInput') input;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    try {
      const filterValue = value.toLowerCase();
      return this.options.filter(optionValue => optionValue[this.label].toLowerCase().includes(filterValue));
    } catch (e) {
    }
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
    if (this.input.nativeElement.value === '') {
      this.clearButton(true);
      this.inputModelChange.emit(null);
    } else {
      this.clearButton(false);
    }
  }

  clearButton(isClear) {
    this.isClear = isClear;
  }

  clearText() {
    this.input.nativeElement.value = '';
    this.onChange();
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions('');
    this.input.nativeElement.value = $event[this.label];
    this.inputModelChange.emit($event);
    this.clearButton(false);
  }

  public setOptions(options) {
    this.options = options;
    this.filteredOptions$ = of(this.options);
  }
}
