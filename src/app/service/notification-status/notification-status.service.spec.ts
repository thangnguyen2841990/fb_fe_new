import { TestBed } from '@angular/core/testing';

import { NotificationStatusService } from './notification-status.service';

describe('NotificationStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationStatusService = TestBed.get(NotificationStatusService);
    expect(service).toBeTruthy();
  });
});
