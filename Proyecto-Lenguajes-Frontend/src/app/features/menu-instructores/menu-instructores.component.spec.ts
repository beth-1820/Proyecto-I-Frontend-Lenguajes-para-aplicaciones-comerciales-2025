import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInstructoresComponent } from './menu-instructores.component';

describe('MenuInstructoresComponent', () => {
  let component: MenuInstructoresComponent;
  let fixture: ComponentFixture<MenuInstructoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuInstructoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
