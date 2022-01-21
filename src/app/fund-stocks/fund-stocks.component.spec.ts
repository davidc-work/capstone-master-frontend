import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundStocksComponent } from './fund-stocks.component';

describe('FundStocksComponent', () => {
  let component: FundStocksComponent;
  let fixture: ComponentFixture<FundStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
