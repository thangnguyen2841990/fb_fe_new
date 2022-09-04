import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationDto} from '../../model/notification-dto';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class NotificationStatusService {

  constructor(private http: HttpClient) { }

  getAllNotificationOfUser(userId: number): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${API_URL}/notifications/allOfUser/user/${userId}`);
  }
}
