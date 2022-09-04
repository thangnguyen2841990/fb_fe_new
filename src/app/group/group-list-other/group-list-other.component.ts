import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../model/group';
import {AuthService} from '../../service/auth/auth.service';
import {GroupService} from '../../service/group/group.service';
import {GroupNotificationService} from '../../service/group-notification/group-notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-list-other',
  templateUrl: './group-list-other.component.html',
  styleUrls: ['./group-list-other.component.css']
})
export class GroupListOtherComponent implements OnInit {
  groups: Group[];
  currentUserId: number;
  groupIdNoti: number[] = [];
  modalRef: BsModalRef;
  groupId: number;

  constructor(private authService: AuthService,
              private groupService: GroupService,
              private groupNotificationService: GroupNotificationService,
              private modalService: BsModalService,
              private router: Router
  ) {
    this.currentUserId = this.authService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllGroupOtherUser();
    this.getAllNotiOfUser();
  }

  getAllGroupOtherUser() {
    this.groupService.getAllGroupOtherUser(this.currentUserId).subscribe((groups) => {
      this.groups = groups;
    });
  }

  createNotificationAddGroup(userId: number, groupId: number) {
    this.groupNotificationService.createNewNotification(userId, groupId).subscribe(() => {
      this.getAllNotiOfUser();
      this.getAllGroupOtherUser();
    });
  }

  getAllNotiOfUser() {
    this.groupNotificationService.getAllNotiOfUser(this.currentUserId).subscribe((listNoti) => {
      for (let i = 0; i < listNoti.length; i++) {
        this.groupIdNoti.push(listNoti[i].group.id);
      }
    });
  }

  openModalCancleJoinGroup(templateCancelJoinGroup: TemplateRef<any>, groupId: number) {
    this.modalRef = this.modalService.show(
      templateCancelJoinGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.groupId = groupId;
  }

  deleteNotification() {
    this.groupNotificationService.delete(this.currentUserId, this.groupId).subscribe((noti) => {
      this.modalRef.hide();
      this.reloadComponent();
      this.getAllNotiOfUser();
      this.getAllGroupOtherUser();
    });
  }
  reloadComponent() {
    let currentUrl = `/group/list/other`;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
