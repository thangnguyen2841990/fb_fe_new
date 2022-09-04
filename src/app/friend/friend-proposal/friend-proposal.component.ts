import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {FriendNotificationService} from '../../service/friend-notification/friend-notification.service';
import {NotificationService} from '../../service/notification/notification.service';
import {CheckExist} from '../../model/check-exist';

@Component({
  selector: 'app-friend-proposal',
  templateUrl: './friend-proposal.component.html',
  styleUrls: ['./friend-proposal.component.css']
})
export class FriendProposalComponent implements OnInit {
  users: User[] = [];
  currentUserId: number;
  isExist = false;
  status1 : CheckExist = {
    status: true
  }
  status2 : CheckExist = {
    status: false
  }
  constructor(private userService: UserService,
              private authService: AuthService,
              private friendNotificationService: FriendNotificationService,
              private noticationService: NotificationService) {
    this.currentUserId = this.authService.currentUserValue.id;

  }

  ngOnInit() {
    this.getAllUSer();

  }
  getAllUSer() {
    this.userService.getAllUser(this.currentUserId).subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }
  createNotificationService(fromUserId: number, toUserId: number) {
    this.friendNotificationService.createNewNotification(fromUserId, toUserId).subscribe(() => {
      this.noticationService.showMessage('success', 'Gửi lời mời kết bạn thành công!')
    })
  }
  checkNotificationFriendExist(fromUserId: number, toUserID: number) {
    this.friendNotificationService.checkExist(fromUserId, toUserID).subscribe((checkExist) => {
      this.isExist = checkExist.status;
    })
  }

}
