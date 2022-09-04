import { TestBed } from '@angular/core/testing';

import { GroupNotificationService } from './group-notification.service';

describe('GroupNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupNotificationService = TestBed.get(GroupNotificationService);
    expect(service).toBeTruthy();
  });
});
