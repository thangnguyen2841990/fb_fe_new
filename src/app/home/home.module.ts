import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NavbarModule} from '../navbar/navbar.module';
import { AboutComponent } from './about/about.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment.prod';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {NgbAlertModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material';
import { AboutUserComponent } from './about-user/about-user.component';
import { AboutFriendComponent } from './about-friend/about-friend.component';
import {Chat1Module} from '../chat1/chat1.module';


@NgModule({
  declarations: [HomeComponent, AboutComponent, AboutUserComponent, AboutFriendComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NavbarModule,
    ScrollingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbPaginationModule,
    NgbAlertModule,
    NgbDropdownModule,
    MatSelectModule,
    FormsModule,
    Chat1Module,
  ],
  providers: [
    AngularFireStorage
  ],
})
export class HomeModule { }
