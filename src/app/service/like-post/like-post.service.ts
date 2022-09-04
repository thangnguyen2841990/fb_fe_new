import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikePost} from '../../model/like-post';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class LikePostService {

  constructor(private http: HttpClient) { }

  createLikePost(userId: number, postId: number) : Observable<LikePost> {
    return this.http.post<LikePost>(`${API_URL}/likePosts/createNewLike/user/${userId}/post/${postId}`, userId)
  }
}
