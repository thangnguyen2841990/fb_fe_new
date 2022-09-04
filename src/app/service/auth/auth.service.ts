import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CheckExist} from '../../model/check-exist';
import {PasswordCorrect} from '../../model/password-correct';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  userRegister: User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${API_URL}/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(signUpForm): Observable<User> {
    return this.http.post<User>(`${API_URL}/register`, signUpForm);
  }

  usernameCheckExist(username: string) {
    return this.http.post<CheckExist>(`${API_URL}/usernameExist/username/${username}`, username);
  }

  passwordCorrect(username: string, password: string) {
    return this.http.post<PasswordCorrect>(`${API_URL}/passwordCorrect/username/${username}/password/${password}`, {username, password});
  }

 get currentUserValue() {
    return this.currentUserSubject.value;
  }
  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
