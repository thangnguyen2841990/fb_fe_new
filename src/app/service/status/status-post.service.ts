import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class StatusPostService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${API_URL}/status`);
  }
}
