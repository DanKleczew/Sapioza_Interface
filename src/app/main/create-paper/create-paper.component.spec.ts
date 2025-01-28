import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaperComponent } from './create-paper.component';

describe('CreatePaperComponent', () => {
  let component: CreatePaperComponent;
  let fixture: ComponentFixture<CreatePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
