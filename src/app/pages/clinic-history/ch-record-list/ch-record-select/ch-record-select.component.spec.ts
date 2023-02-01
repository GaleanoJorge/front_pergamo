import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChRecordSelectComponent } from './ch-record-select.component';

describe('ChRecordSelectComponent', () => {
  let component: ChRecordSelectComponent
  let fixture: ComponentFixture<ChRecordSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChRecordSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChRecordSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
