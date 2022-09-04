import { TestBed } from '@angular/core/testing';

import { LikePostService } from './like-post.service';

describe('LikePostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikePostService = TestBed.get(LikePostService);
    expect(service).toBeTruthy();
  });
});
