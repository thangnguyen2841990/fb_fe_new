import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendProposalComponent } from './friend-proposal.component';

describe('FriendProposalComponent', () => {
  let component: FriendProposalComponent;
  let fixture: ComponentFixture<FriendProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
