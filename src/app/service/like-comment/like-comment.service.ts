import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikeComment} from '../../model/like-comment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  constructor(private http: HttpClient) {
  }

  createNewLikeComment(userId: number, postId: number, commentId: number): Observable<LikeComment> {
    return this.http.post<LikeComment>(`${API_URL}/likeComments/createLikeComment/user/${userId}/post/${postId}/comment/${commentId}`, userId);
  }
}
