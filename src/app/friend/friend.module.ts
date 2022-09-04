import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendRoutingModule } from './friend-routing.module';
import { NotificationFriendListComponent } from './notification-friend-list/notification-friend-list.component';
import {NavbarModule} from '../navbar/navbar.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { FriendProposalComponent } from './friend-proposal/friend-proposal.component';


@NgModule({
  declarations: [NotificationFriendListComponent, ListFriendComponent, FriendProposalComponent],
  imports: [
    CommonModule,
    FriendRoutingModule,
    NavbarModule,
    ModalModule.forRoot(),
  ]
})
export class FriendModule { }
