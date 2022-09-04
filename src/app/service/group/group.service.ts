import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../../model/group';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createNewGroup(adminId: number, groupForm: Group) : Observable<Group> {
    return this.http.post<Group>(`${API_URL}/groups/createGroup/admin/${adminId}`, groupForm);
  }
  getAllGroupOfUser(userId:number): Observable<Group[]> {
    return this.http.get<Group[]>(`${API_URL}/groups/allGroupOfUser/user/${userId}`);
  }
  getAllGroupOtherUser(userId:number): Observable<Group[]> {
    return this.http.get<Group[]>(`${API_URL}/groups/allGroupOtherUser/user/${userId}`);
  }
  findById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${API_URL}/groups/group/${groupId}`);
  }
  update(groupId: number, groupForm): Observable<Group> {
    return this.http.put<Group>(`${API_URL}/groups/update/group/${groupId}`, groupForm);
  }
  delete(groupId: number): Observable<Group> {
    return this.http.delete<Group>(`${API_URL}/groups/delete/group/${groupId}`);
  }
}
