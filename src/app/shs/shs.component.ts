import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var JitsiMeetExternalAPI: any;
import '../../assets/js/external_api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shs',
  templateUrl: './shs.component.html',
  styleUrls: ['./shs.component.css']
})
export class ShsComponent implements OnInit {
  studentPhone: string;

  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
  }

  getJitsiRoomId(studentPhone) {
    if (studentPhone.length <= 5) {
      document.getElementById('serverResponse').innerHTML = '<p class="text-danger"> Please Enter valid Student Id</p>';
      return;
    }
    // tslint:disable-next-line:max-line-length
    document.getElementById('serverResponse').innerHTML = '<div class="spinner-border" role="status"><span class="sr-only" id="loading"></span></div>';
    this.api.getRoomKeyTag(studentPhone)
      .subscribe(
        data => {
          console.log(data);
          const parsed = JSON.parse(data);
          document.getElementById('serverResponse').innerHTML = '';
          if (parsed.error === 400) {
            document.getElementById('serverResponse').innerHTML = '<p class="text-danger"> Invalid Id. Please Contact Your School. </p>';
          } else {
            this.initiateJitsi(parsed.roomKey.toString(), parsed.name.toString());
          }
        },
        error => {
          console.log(error);
        });
  }

  initiateJitsi(roomKey, studentName) {
    this.ngOnInit();
    // const myNode = document.getElementById('bodyframe');
    // myNode.innerHTML = '';
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomKey,
      width: screen.width,
      height: screen.height,
      parentNode: document.querySelector('#bodyframe'),
      configOverwrite: { disableDeepLinking: true,  requireDisplayName: false},
      requireDisplayName: false,
      userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: studentName
      }
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }

}
