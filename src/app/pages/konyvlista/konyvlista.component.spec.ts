import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonyvlistaComponent } from './konyvlista.component';

describe('KonyvlistaComponent', () => {
  let component: KonyvlistaComponent;
  let fixture: ComponentFixture<KonyvlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvlistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
