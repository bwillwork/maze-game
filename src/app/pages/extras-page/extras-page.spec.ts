import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtrasPage } from './extras-page';

describe('ExtrasPage', () => {
  let component: ExtrasPage;
  let fixture: ComponentFixture<ExtrasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtrasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtrasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
