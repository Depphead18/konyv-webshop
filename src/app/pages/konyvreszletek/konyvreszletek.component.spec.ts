import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonyvReszletekComponent } from './konyvreszletek.component';

describe('KonyvreszletekComponent', () => {
  let component: KonyvReszletekComponent;
  let fixture: ComponentFixture<KonyvReszletekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvReszletekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
