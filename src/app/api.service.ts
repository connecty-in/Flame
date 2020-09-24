import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {RoomsConfig} from "./pages/external-api/external-api.component";

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://flame-test.herokuapp.com/api';
// const proxyurl = '';
// const baseUrl = 'http://localhost:3001/api';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ping$(): Observable<any> {
    return this.http.get('/api/external');
  }

  getRoomKeyTag(studentPhone) {
    return this.http.get(`${proxyurl}${baseUrl}/jitsi/getjitsiroomid/${studentPhone}`,  {responseType: 'text'});
  }
  getRooms() {
    console.log('Called');
    return this.http.get(`${proxyurl}${baseUrl}/jitsi/getjitsirooms`,  {responseType: 'text'});
  }

  getPosts() {
   return this.http.get<RoomsConfig>(`${proxyurl}${baseUrl}/jitsi/getjitsirooms`);
  }

}
