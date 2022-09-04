import {Component, OnInit, TemplateRef} from '@angular/core';
import {FriendNotificationService} from '../../service/friend-notification/friend-notification.service';
import {FriendNotification} from '../../model/friend-notification';
import {AuthService} from '../../service/auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification-friend-list',
  templateUrl: './notification-friend-list.component.html',
  styleUrls: ['./notification-friend-list.component.css']
})
export class NotificationFriendListComponent implements OnInit {
  listNotification: FriendNotification[] = [];
  currentUserId: number;
  modalRef: BsModalRef;
  notificationId: number;
  constructor(private notificationFriendService: FriendNotificationService,
              private authService: AuthService,
              private modalService: BsModalService) {
    this.currentUserId = this.authService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllNotificationOfUSer();
  }
  getAllNotificationOfUSer() {
    this.notificationFriendService.getAllNotificationOfUser(this.currentUserId).subscribe((list)=> {
      this.listNotification = list;
    })
  }

  openModalDeleteNotification(templateDeleteNotification: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteNotification,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.notificationId = id;
  }

  deleteNotification() {
    this.notificationFriendService.delete(this.notificationId).subscribe(()=> {
      this.getAllNotificationOfUSer();
      this.modalRef.hide();
    })
  }

  acceptFriend(id: number) {
    this.notificationFriendService.accept(id).subscribe(()=>{
      this.getAllNotificationOfUSer();
    })
  }
}
