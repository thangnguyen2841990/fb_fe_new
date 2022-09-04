import { TestBed } from '@angular/core/testing';

import { ListFriendService } from './list-friend.service';

describe('ListFriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListFriendService = TestBed.get(ListFriendService);
    expect(service).toBeTruthy();
  });
});
