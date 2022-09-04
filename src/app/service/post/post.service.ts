import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../model/post';
import {PostFrondtend} from '../../model/post-frondtend';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  savePost(userId: number, postForm): Observable<Post> {
    return this.http.post(`${API_URL}/posts/user/${userId}`, postForm);
  }
  getAllPostOfUser(userId: number): Observable<PostFrondtend[]> {
    return this.http.get<PostFrondtend[]>(`${API_URL}/posts/allPost/user/${userId}`);
  }
  getAllPostOfFriends(userId: number): Observable<PostFrondtend[]> {
    return this.http.get<PostFrondtend[]>(`${API_URL}/posts/allPostOfFriend/user/${userId}`);

  }
  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${API_URL}/posts/deletePost/post/${postId}`);
  }
  getPostById(postId: number): Observable<PostFrondtend> {
    return this.http.get<PostFrondtend>(`${API_URL}/posts/post/${postId}`);
  }
  updatePost(postId: number, postForm): Observable<Post> {
    return this.http.put<Post>(`${API_URL}/posts/editPost/post/${postId}`, postForm);
  }
  getAllPostAboutFriend(userId: number): Observable<PostFrondtend[]> {
    return this.http.get<PostFrondtend[]>(`${API_URL}/posts/allPostAboutFriend/user/${userId}`);
  }
  getAllPostAboutUser(userId: number): Observable<PostFrondtend[]> {
    return this.http.get<PostFrondtend[]>(`${API_URL}/posts/allPostAboutUser/user/${userId}`);
  }
}
