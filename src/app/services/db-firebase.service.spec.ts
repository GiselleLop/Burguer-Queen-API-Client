import { TestBed } from '@angular/core/testing';

import { DbFirebaseService } from './db-firebase.service';

describe('DbFirebaseService', () => {
  let service: DbFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
