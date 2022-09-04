import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'friend',
    loadChildren: () => import('./friend/friend.module').then(module => module.FriendModule)
  },
  {
    path: 'nav',
    loadChildren: () => import('./navbar/navbar.module').then(module => module.NavbarModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat1/chat1.module').then(module => module.Chat1Module)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then(module => module.GroupModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
