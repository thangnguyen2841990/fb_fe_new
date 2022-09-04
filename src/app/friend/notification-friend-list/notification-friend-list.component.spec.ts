import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFriendListComponent } from './notification-friend-list.component';

describe('NotificationFriendListComponent', () => {
  let component: NotificationFriendListComponent;
  let fixture: ComponentFixture<NotificationFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationFriendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
