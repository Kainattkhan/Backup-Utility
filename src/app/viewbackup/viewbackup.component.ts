import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-viewbackup',
  templateUrl: './viewbackup.component.html',
  styleUrls: ['./viewbackup.component.css']
})
export class ViewbackupComponent implements OnInit {

  constructor(public authService:AuthServiceService) { }

  ngOnInit(): void {
  }

}
