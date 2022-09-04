import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home/home.component';
import {NotificationFriendListComponent} from './notification-friend-list/notification-friend-list.component';
import {ListFriendComponent} from './list-friend/list-friend.component';
import {FriendProposalComponent} from './friend-proposal/friend-proposal.component';


const routes: Routes = [
  {
    path : 'notification/list',
    component : NotificationFriendListComponent
  },
  {
    path : 'list',
    component : ListFriendComponent
  },
  {
    path: 'proposal',
    component : FriendProposalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule { }
