import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/user-token';
import {AuthService} from '../auth/auth.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
const API_URL = `${environment.apiUrl}`;
declare var $: any;
declare var Swal: any;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: UserToken = {};
  constructor(private authenticationService: AuthService) { }

  connectToChat(currentUser, message) {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/chats', (messageOutput) => {
        const data = JSON.parse(messageOutput.body);
        this.authenticationService.currentUser.subscribe(value => {
          this.currentUser = value;
          if (this.currentUser.id === data.receiver.id) {
            this.drawNewChatMessage(data, this.currentUser);
            setTimeout(() => {
              message.nativeElement.scrollTop = message.nativeElement.scrollHeight;
            }, 1);
          }
        });
      });
    });
  }
  drawNewChatMessage(messageOutput, currentUser) {
    const ul = document.getElementById('history');
    const firstLi = $('ul#history li:first').get(0);
    const li = firstLi.cloneNode(true);
    li.innerHTML = messageOutput.content;
    const className = currentUser.id === messageOutput.sender.id ? 'me' : 'you';
    li.setAttribute('class', className);
    ul.appendChild(li);
  }
  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
  sendMessage(chat) {
    this.stompClient.send('/app/chats', {}, JSON.stringify(chat));
  }
}
