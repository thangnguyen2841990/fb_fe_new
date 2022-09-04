import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../service/group/group.service';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {GroupNotification} from '../../model/group-notification';
import {NotificationService} from '../../service/notification/notification.service';
import {GroupNotificationService} from '../../service/group-notification/group-notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {
  groupId: number;
  group: Group = {};
  currentUserId: number;
  user:User = {};
  notifications: GroupNotification[] = [];
  modalRef: BsModalRef;
  notificationId:number;
  constructor(private activatedRoute: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService,
              private userService: UserService,
              private groupNotificationService: GroupNotificationService,
              private modalService: BsModalService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.groupId = +paramMap.get('id');
    });
    this.currentUserId = this.authService.currentUserValue.id;
    this.findById();
    this.findUserByID();
  }

  ngOnInit() {
    this.getAllNotificationOfGroup();
  }

  findById() {
    this.groupService.findById(this.groupId).subscribe((group) => {
      this.group = group;
    })
  }
  findUserByID() {
    this.userService.findById(this.currentUserId).subscribe((user)=>{
      this.user = user;
    })
  }
  getAllNotificationOfGroup() {
    this.groupNotificationService.getAllNotiOfGroup(this.groupId).subscribe((listNoti)=>{
      this.notifications = listNoti;
    })
  }

  openModalDelete(templateDeleteNotification: TemplateRef<any>, notificationId:number) {
    this.modalRef = this.modalService.show(
      templateDeleteNotification,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.notificationId = notificationId;
  }


  deleteNotification() {
    this.groupNotificationService.remove(this.notificationId).subscribe((notification)=>{
      this.getAllNotificationOfGroup();
      this.modalRef.hide();
    })
  }
}
