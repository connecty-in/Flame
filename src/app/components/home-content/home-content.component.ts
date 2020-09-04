import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';
declare var JitsiMeetExternalAPI: any;
import '../../../assets/js/external_api';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;
  studentPhone: string;
  jitsiRoomId: Object;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getJitsiRoomId(studentPhone) {
    this.api.getRoomKeyTag(studentPhone)
      .subscribe(
        data => {
          const parsedResponse = JSON.parse(data);
          if (parsedResponse.error === 400) {
            console.log('Invalid Phone Number');
          } else {
            console.log('Jitsi Room Id fetched from Database ' + parsedResponse.roomKey.toString());
            this.initiateJitsi(parsedResponse.roomKey.toString());
          }
        },
        error => {
          console.log(error);
        });
  }

  initiateJitsi(roomKey) {
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomKey,
      width: 700,
      height: 700,
      parentNode: document.getElementById('#bodyframe').innerHTML
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }

}
