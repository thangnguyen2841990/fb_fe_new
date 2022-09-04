import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Chat} from '../../model/chat';
import {Observable} from 'rxjs';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  getAllChat(user1Id: number, user2Id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${API_URL}/chats?userId1=${user1Id}&userId2=${user2Id}`);
  }
  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(API_URL + '/chats', chat);
  }

  getChat(id: number): Observable<Chat> {
    return this.http.get<Chat>(API_URL + `/chats/${id}`);
  }

  updateChat(id: number, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(API_URL + `/chats/${id}`, chat);
  }

  deleteChat(id1, id2): Observable<Chat> {
    return this.http.delete<Chat>(API_URL + `/chats/${id1}/${id2}`);
  }
}
