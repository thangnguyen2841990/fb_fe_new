import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FriendNotification} from '../../model/friend-notification';
import {CheckExist} from '../../model/check-exist';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class FriendNotificationService {

  constructor(private http: HttpClient) { }

  createNewNotification(fromUserId: number, toUserId: number): Observable<FriendNotification> {
    return this.http.post<FriendNotification>(`${API_URL}/notification-friends/createNewNotificationFriend/fromUser/${fromUserId}/toUser/${toUserId}`, fromUserId);
  }
  getAllNotificationOfUser(currenUserId: number): Observable<FriendNotification[]> {
    return this.http.get<FriendNotification[]>(`${API_URL}/notification-friends/allNotificationOfUser/toUserId/${currenUserId}`);
  }
  getAllNotificationFromUser(currenUserId: number): Observable<FriendNotification[]> {
    return this.http.get<FriendNotification[]>(`${API_URL}/notification-friends/allNotificationFromUser/fromUserId/${currenUserId}`);
  }
  delete(notificationId: number): Observable<FriendNotification> {
    return this.http.delete<FriendNotification>(`${API_URL}/notification-friends/refuse/notification/${notificationId}`);
  }
  accept(notificationId: number): Observable<FriendNotification> {
    return this.http.post<FriendNotification>(`${API_URL}/notification-friends/accept/notification/${notificationId}`,notificationId);
  }
  checkExist(fromUserId: number, toUserId: number): Observable<CheckExist> {
    return this.http.post<CheckExist>(`${API_URL}/notification-friends/checkExist/fromUser/${fromUserId}/toUser/${toUserId}`,toUserId);
  }
  cancel(fromUserId: number, toUserId: number): Observable<FriendNotification> {
  return  this.http.delete<FriendNotification>(`${API_URL}/notification-friends/delete/fromUser/${fromUserId}/toUser/${toUserId}`)
  }
}
