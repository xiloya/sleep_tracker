import { TestBed } from '@angular/core/testing';

import { SleepData } from './sleep-data';

describe('SleepData', () => {
  let service: SleepData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
