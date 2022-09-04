import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../service/group/group.service';
import {Group} from '../../model/group';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.css']
})
export class AboutGroupComponent implements OnInit {
  groupId: number;
  group: Group = {};
  currentUserId: number;
  user:User = {};
  constructor(private activatedRoute: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService,
              private userService: UserService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.groupId = +paramMap.get('id');
    });
    this.currentUserId = this.authService.currentUserValue.id;
    this.findById();
    this.findUserByID();
  }

  ngOnInit() {
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
}
