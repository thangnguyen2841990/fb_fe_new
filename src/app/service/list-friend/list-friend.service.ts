import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {ListFriend} from '../../model/list-friend';
import {CheckFriend} from '../../model/check-friend';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ListFriendService {

  constructor(private http: HttpClient) { }

  getAllFriendOfUser(currentUserId: number): Observable<ListFriend[]> {
    return this.http.get<ListFriend[]>(`${API_URL}/listFriends/allFriends/user/${currentUserId}`)
  }
  checkFriend(currentUserId: number, userId: number): Observable<CheckFriend> {
    return this.http.post<CheckFriend>(`${API_URL}/listFriends/checkFriend/currentUser/${currentUserId}/user/${userId}`,currentUserId);
  }
  unFriend(friendId: number):Observable<ListFriend> {
    return this.http.delete<ListFriend>(`${API_URL}/listFriends/unFriend/friend/${friendId}`);
  }
}
