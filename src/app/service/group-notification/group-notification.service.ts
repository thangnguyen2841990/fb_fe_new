import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GroupNotification} from '../../model/group-notification';
import {Observable} from 'rxjs';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class GroupNotificationService {

  constructor(private http: HttpClient) { }
  getAllNotiOfUser(userId: number):Observable<GroupNotification[]> {
    return this.http.get<GroupNotification[]>(`${API_URL}/group-notifications/allNotiOfUser/user/${userId}`);
  }
  getAllNotiOfGroup(groupId: number): Observable<GroupNotification[]> {
    return this.http.get<GroupNotification[]>(`${API_URL}/group-notifications/allNotiOfGroup/group/${groupId}`);
  }
  createNewNotification(userId: number, groupId: number): Observable<GroupNotification> {
    return this.http.post<GroupNotification>(`${API_URL}/group-notifications/createNewNotification/user/${userId}/group/${groupId}`, userId);
  }
  delete(userId: number, groupId: number): Observable<GroupNotification> {
    return this.http.delete<GroupNotification>(`${API_URL}/group-notifications/delete/user/${userId}/group/${groupId}`);
  }
  remove(notificationId: number): Observable<GroupNotification> {
    return this.http.delete<GroupNotification>(`${API_URL}/group-notifications/delete/notification/${notificationId}`);
  }
}
