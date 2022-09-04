import {Component, OnInit, TemplateRef} from '@angular/core';
import {ListFriend} from '../../model/list-friend';
import {ListFriendService} from '../../service/list-friend/list-friend.service';
import {AuthService} from '../../service/auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit {

  currentUserId: number;
  listFriends: ListFriend[] = [];
  totalFriends: number;
  modalRef: BsModalRef;
  friendId: number;

  constructor(private listFriendService: ListFriendService,
              private authService: AuthService,
             private modalService: BsModalService) {
    this.currentUserId = authService.currentUserValue.id;

  }

  ngOnInit() {
    this.getAllFriendsOfUser(this.currentUserId);
  }

  getAllFriendsOfUser(id) {
    this.listFriendService.getAllFriendOfUser(id).subscribe((list)=> {
      this.listFriends = list;
      this.totalFriends = list.length;
    });
  };

  unfriend(friendId: number) {
    this.listFriendService.unFriend(friendId).subscribe((friend)=>{
      this.getAllFriendsOfUser(this.currentUserId);
      this.modalRef.hide();
    })
  }

  openModalUnfriend(templateUnfriend: TemplateRef<any>, friendId) {
    this.modalRef = this.modalService.show(
      templateUnfriend,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.friendId = friendId;
  }

}
