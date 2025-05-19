import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KonyvSzerkesztesComponent } from './konyvszerkesztes.component';

describe('KonyvSzerkesztesComponent', () => {
  let component: KonyvSzerkesztesComponent;
  let fixture: ComponentFixture<KonyvSzerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvSzerkesztesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});