import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Maze } from './maze';

describe('Maze', () => {
  let component: Maze;
  let fixture: ComponentFixture<Maze>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maze],
    }).compileComponents();

    fixture = TestBed.createComponent(Maze);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
