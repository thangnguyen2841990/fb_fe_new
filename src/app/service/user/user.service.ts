import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findById(userId: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/user/${userId}`);
  }
  changeAvatar(avatar, userId: number): Observable<User> {
    return this.http.post<User>(`${API_URL}/users/changeAvatar/user/${userId}`, avatar);
  }
  changeBackGround(background, userId: number): Observable<User> {
    return this.http.post<User>(`${API_URL}/users/changeBackground/user/${userId}`, background);
  }
  getAllUser(currentUserId: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/getAllUser/currentUser/${currentUserId}`)
  }
  searchByName(currentUserId:number ,name: string):Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/searchByName/currentUser/${currentUserId}?name=${name}`);
  }
 }
