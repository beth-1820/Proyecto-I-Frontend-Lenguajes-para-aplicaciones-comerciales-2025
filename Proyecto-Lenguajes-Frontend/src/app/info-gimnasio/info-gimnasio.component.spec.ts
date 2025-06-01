import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGimnasioComponent } from './info-gimnasio.component';

describe('InfoGimnasioComponent', () => {
  let component: InfoGimnasioComponent;
  let fixture: ComponentFixture<InfoGimnasioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoGimnasioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGimnasioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
