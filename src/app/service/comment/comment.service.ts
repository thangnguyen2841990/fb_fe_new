import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentEntity} from '../../model/comment-entity';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(userId: number, postId: number, commentForm): Observable<CommentEntity> {
    return this.http.post<CommentEntity>(`${API_URL}/comments/createNewComment/user/${userId}/post/${postId}`, commentForm);
  }
  editComment(commentId: number, commentForm): Observable<CommentEntity> {
    return this.http.put<CommentEntity>(`${API_URL}/comments/editComment/comment/${commentId}`, commentForm);
  }
  deleteComment(commentId: number): Observable<CommentEntity> {
    return this.http.delete<CommentEntity>(`${API_URL}/comments/deleteComment/comment/${commentId}`);
  }
  findCommentByID(commentId: number): Observable<CommentEntity> {
    return this.http.get<CommentEntity>(`${API_URL}/comments/comment/${commentId}`);
  }
}
