import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskovi } from './taskovi';

describe('Taskovi', () => {
  let component: Taskovi;
  let fixture: ComponentFixture<Taskovi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskovi],
    }).compileComponents();

    fixture = TestBed.createComponent(Taskovi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
