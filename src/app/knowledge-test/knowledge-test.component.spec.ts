import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTestComponent } from './knowledge-test.component';

describe('KnowledgeTestComponent', () => {
  let component: KnowledgeTestComponent;
  let fixture: ComponentFixture<KnowledgeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
