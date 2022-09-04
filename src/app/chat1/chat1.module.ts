import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Chat1RoutingModule } from './chat1-routing.module';
import { ChatOnlineComponent } from './chat-online/chat-online.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from '../auth/auth.module';
import {NgbAlertModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from '../navbar/navbar.module';
import {MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ChatOnlineComponent],
  exports: [
    ChatOnlineComponent
  ],
  imports: [
    CommonModule,
    Chat1RoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbDropdownModule,
  ]
})
export class Chat1Module { }
