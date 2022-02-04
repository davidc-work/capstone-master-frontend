import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingfundComponent } from './sellingfund.component';

describe('SellingfundComponent', () => {
  let component: SellingfundComponent;
  let fixture: ComponentFixture<SellingfundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingfundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
