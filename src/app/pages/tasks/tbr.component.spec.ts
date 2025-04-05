import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBRComponent } from './tbr.component';

describe('TasksComponent', () => {
  let component: TBRComponent;
  let fixture: ComponentFixture<TBRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TBRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TBRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
