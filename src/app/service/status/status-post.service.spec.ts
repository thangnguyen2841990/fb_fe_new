import { TestBed } from '@angular/core/testing';

import { StatusPostService } from './status-post.service';

describe('StatusPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusPostService = TestBed.get(StatusPostService);
    expect(service).toBeTruthy();
  });
});
