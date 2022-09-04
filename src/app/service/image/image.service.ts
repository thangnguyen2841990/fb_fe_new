import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../../model/image';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  findImageById(imageId: number): Observable<Image> {
    return this.http.get<Image>(`${API_URL}/images/image/${imageId}`);
  }
 deleteImage(imageId: number): Observable<Image> {
    return this.http.delete(`${API_URL}/images/deleteImage/image/${imageId}`);
 }
}
