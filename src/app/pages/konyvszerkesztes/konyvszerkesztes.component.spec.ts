import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonyvszerkesztesComponent } from './konyvszerkesztes.component';

describe('KonyvszerkesztesComponent', () => {
  let component: KonyvszerkesztesComponent;
  let fixture: ComponentFixture<KonyvszerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvszerkesztesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvszerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
