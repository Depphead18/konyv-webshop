import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonyvreszletekComponent } from './konyvreszletek.component';

describe('KonyvreszletekComponent', () => {
  let component: KonyvreszletekComponent;
  let fixture: ComponentFixture<KonyvreszletekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvreszletekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvreszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
