import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;
  studentPhone: string;
  jitsiRoomId: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getJitsiRoomId(studentPhone) {
    this.api.getRoomKeyTag(studentPhone)
      .subscribe(
        data => {
          this.jitsiRoomId = data;
          console.log('Jitsi Room Id fetched from Database' + this.jitsiRoomId.toString());
        },
        error => {
          console.log(error);
        });
  }

}
