import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAssessmentComponent } from './portfolio-assessment.component';

describe('PortfolioAssessmentComponent', () => {
  let component: PortfolioAssessmentComponent;
  let fixture: ComponentFixture<PortfolioAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
