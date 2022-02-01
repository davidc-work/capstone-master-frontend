import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSingleComponent } from './transaction-single.component';

describe('TransactionSingleComponent', () => {
  let component: TransactionSingleComponent;
  let fixture: ComponentFixture<TransactionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
