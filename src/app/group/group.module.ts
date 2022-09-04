import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupCreateComponent } from './group-create/group-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavbarModule} from '../navbar/navbar.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupListOtherComponent } from './group-list-other/group-list-other.component';
import { AboutGroupComponent } from './about-group/about-group.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ListNotificationComponent } from './list-notification/list-notification.component';


@NgModule({
  declarations: [GroupCreateComponent, GroupListComponent, GroupListOtherComponent, AboutGroupComponent, ListNotificationComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    NavbarModule,
    ScrollingModule,
    ModalModule.forRoot(),


  ]
})
export class GroupModule { }
