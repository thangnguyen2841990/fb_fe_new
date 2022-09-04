import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../service/user/user.service';
import {User} from '../model/user';
import {NotificationStatusService} from '../service/notification-status/notification-status.service';
import {NotificationDto} from '../model/notification-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUserID: number;
  user: User;
  listNotification: NotificationDto[] = [];
  totalNotification: number;
  users: User[];
  name:string;
  searchForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  })
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private notificationService: NotificationStatusService
              ) {
    this.currentUserID = this.authService.currentUserValue.id;
    this.findById(this.currentUserID);
  }

  ngOnInit() {
    this.getAllNotificationOfUser();
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  findById(id) {
    this.userService.findById(id).subscribe((user) => {
      this.user = user;
      console.log(this.user.avatar);
    });
  }

  getAllNotificationOfUser() {
    this.notificationService.getAllNotificationOfUser(this.currentUserID).subscribe((listNotification)=>{
      this.listNotification = listNotification;
      this.totalNotification = listNotification.length;
    })
  }

  searchByName() {
   this.router.navigateByUrl(`/nav/search/${this.searchForm.value.content}`);
    this.reloadComponent();
    this.name = this.searchForm.value.content;
    this.searchForm = new FormGroup({
      content: new FormControl(this.name, Validators.required)
    })
  }

  reloadComponent() {
    let currentUrl = `/nav/search/${this.searchForm.value.content}`;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
