import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ping$(): Observable<any> {
    return this.http.get('/api/external');
  }

  getRoomKeyTag(studentPhone) {
    return this.http.get(`${baseUrl}/jitsi/getjitsiroomid/${studentPhone}`);
  }

}
