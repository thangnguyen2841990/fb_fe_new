import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReplyEntity} from '../../model/reply-entity';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }

  createNewReply(userId: number, postId: number, commentId: number, replyForm): Observable<ReplyEntity> {
    return this.http.post<ReplyEntity>(`${API_URL}/replies/createReply/user/${userId}/comment/${commentId}/post/${postId}`, replyForm);
  }
  editReply(replyId: number, replyForm): Observable<ReplyEntity> {
    return this.http.put<ReplyEntity>(`${API_URL}/replies/editReply/reply/${replyId}`, replyForm);
  }
  deleteReply(replyId: number):Observable<ReplyEntity> {
    return this.http.delete<ReplyEntity>(`${API_URL}/replies/deleteReply/reply/${replyId}`);
  }
  findReplyById(replyId: number): Observable<ReplyEntity> {
    return this.http.get<ReplyEntity>(`${API_URL}/replies/reply/${replyId}`);
  }
}
