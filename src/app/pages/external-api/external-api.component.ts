import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
declare var JitsiMeetExternalAPI: any;
import '../../../assets/js/external_api';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})

export class ExternalApiComponent implements OnInit {
  selectedRoom: string;
  responseJson: string;
  roomsObject: object;
  roomObject: RoomsConfig;
  rooms: Room[];

  constructor(private api: ApiService) { }

  ngOnInit() {
     this.getRoomsInfo();
  }

  startSession(roomId) {
    this.ngOnInit();
    if (roomId == null || roomId.length == 0){
      document.getElementById('serverResponse').innerHTML = '<p>Please Select a Class</p>';
      return;
    }
    roomId = roomId.substring(1, roomId.length-1);
    console.log('Selected Room Is : ' + roomId);
    const myNode = document.getElementById('bodyframe');
    myNode.innerHTML = '';
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomId,
      width: screen.width,
      height: screen.height,
      parentNode: document.querySelector('#bodyframe'),
      configOverwrite: { disableDeepLinking: true },
      userInfo: {
        email: 'email@jitsiexamplemail.com'
      }
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }

  getRoomsInfo() {
    this.api.getPosts()
      .subscribe(
        (data: RoomsConfig ) => {
          this.roomObject = data;
          this.rooms = data.rooms;
          // console.log('Here ' + data);
          // const parsed = JSON.parse(data);
          // this.roomObject = JSON.parse(data);
          // return parsed;
          // if (this.roomObject.error === 400) {
          //   console.log('Unable to Fetch Rooms');
          // } else {
          //   console.log('I am here');
          //   console.log('Fetched Rooms ' + this.roomObject.rooms.toString());
          //   // this.initiateJitsi(parsed.roomKey.toString());
          // }
        },
        error => {
          console.log(error);
          return {};
        });
    return {};
  }

  pingApi() {
    this.api.ping$().subscribe(
      res => this.responseJson = JSON.stringify(res, null, 2).trim()
    );
  }

}

export interface RoomsConfig {
  error: string;
  rooms: Room[];
}

export interface Room {
  keytag: string;
  class: string;
  section: string;
}
