import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupCreateComponent} from './group-create/group-create.component';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupListOtherComponent} from './group-list-other/group-list-other.component';
import {AboutGroupComponent} from './about-group/about-group.component';
import {ListNotificationComponent} from './list-notification/list-notification.component';


const routes: Routes = [
  {
    path: 'create',
    component: GroupCreateComponent
  },
  {
    path: 'list',
    component: GroupListComponent
  },
  {
    path: 'list/other',
    component: GroupListOtherComponent
  },
  {
    path: 'about/:id',
    component: AboutGroupComponent
  },
  {
    path: 'list/notification/:id',
    component: ListNotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
