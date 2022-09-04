import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListOtherComponent } from './group-list-other.component';

describe('GroupListOtherComponent', () => {
  let component: GroupListOtherComponent;
  let fixture: ComponentFixture<GroupListOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
