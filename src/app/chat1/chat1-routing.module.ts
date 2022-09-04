import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatOnlineComponent} from './chat-online/chat-online.component';


const routes: Routes = [
  {
    path: 'chatOnline/:id',
    component: ChatOnlineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Chat1RoutingModule { }
