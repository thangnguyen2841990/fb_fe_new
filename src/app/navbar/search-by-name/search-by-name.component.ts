import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendNotificationService} from '../../service/friend-notification/friend-notification.service';
import {AuthService} from '../../service/auth/auth.service';
import {ListFriendService} from '../../service/list-friend/list-friend.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent implements OnInit {
  users: User[] = [];
  name: string;
  currentUserId: number;
  checkFriendStatus: boolean;
  listFriendId: number[] = [];
  listNotiId: number[] = [];
  modalRef: BsModalRef;
  toUserId: number;
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private notificationFriendService: FriendNotificationService,
              private authService: AuthService,
              private listFriendService: ListFriendService,
              private router: Router,
              private modalService: BsModalService) {
    this.currentUserId = this.authService.currentUserValue.id;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
  })
  }

  ngOnInit() {
    this.getAllUser(this.name);
    this.getAllFriends();
    this.getAllNoti();

  }

  getAllUser(name:string) {
    this.userService.searchByName(this.currentUserId,name).subscribe((users)=>{
      this.users = users;
    })
  }

  createNotificationService(currentUserId: any, userId: number) {
    this.notificationFriendService.createNewNotification(currentUserId, userId).subscribe(() => {
      this.getAllUser(this.name);
      this.getAllNoti();
    })
  }
  checkFriend(currentUserId: number, userId: number) {
    this.listFriendService.checkFriend(currentUserId, userId).subscribe((checkFriend)=>{
      this.checkFriendStatus = checkFriend.status;
    })
  }

  navigateUrl(userId: number) {
    this.checkFriend(this.currentUserId, userId);
    if (this.checkFriendStatus === true) {
      this.router.navigateByUrl(`/home/aboutFriend/${userId}`);
    }
    if (this.checkFriendStatus === false) {
      this.router.navigateByUrl(`/home/aboutUser/${userId}`);
    }
  }
  getAllFriends() {
    this.listFriendService.getAllFriendOfUser(this.currentUserId).subscribe((friends) =>{
      for (let i = 0; i < friends.length; i++) {
          this.listFriendId.push(friends[i].friendOfUser.id);
      }
    })
  }
  getAllNoti() {
    this.notificationFriendService.getAllNotificationFromUser(this.currentUserId).subscribe((listNoti) => {
      for (let i = 0; i < listNoti.length; i++) {
          this.listNotiId.push(listNoti[i].toUser.id);
      }
    })
  }
  openModalCancleAddFriend(templateCancelAddFriend: TemplateRef<any>, toUserId: number) {
    this.modalRef = this.modalService.show(
      templateCancelAddFriend,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.toUserId = toUserId;
  }

  deleteNotification() {
    this.notificationFriendService.cancel(this.currentUserId, this.toUserId).subscribe((notification)=> {
      this.reloadComponent();
      this.modalRef.hide();
      // this.getAllUser(this.name);
      this.getAllNoti();
    })
  }
  reloadComponent() {
    let currentUrl = `/nav/search/${this.name}`;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
