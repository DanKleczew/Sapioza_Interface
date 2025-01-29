import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperFocusComponent } from './paper-focus.component';

describe('PaperFocusComponent', () => {
  let component: PaperFocusComponent;
  let fixture: ComponentFixture<PaperFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperFocusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
