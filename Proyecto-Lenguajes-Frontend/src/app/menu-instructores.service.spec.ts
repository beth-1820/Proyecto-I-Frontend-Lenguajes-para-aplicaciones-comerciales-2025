import { TestBed } from '@angular/core/testing';

import { MenuInstructoresService } from './menu-instructores.service';

describe('MenuInstructoresService', () => {
  let service: MenuInstructoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuInstructoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
