import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {AboutUserComponent} from './about-user/about-user.component';
import {AboutFriendComponent} from './about-friend/about-friend.component';


const routes: Routes = [
  {
    path : 'index',
    component : HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'aboutUser/:id',
    component: AboutUserComponent
  },
  {
    path: 'aboutFriend/:id',
    component: AboutFriendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
