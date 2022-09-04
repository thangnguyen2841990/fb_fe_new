import { TestBed } from '@angular/core/testing';

import { FriendNotificationService } from './friend-notification.service';

describe('FriendNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendNotificationService = TestBed.get(FriendNotificationService);
    expect(service).toBeTruthy();
  });
});
