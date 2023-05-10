import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  showMongoForm = false;
  showMySQLForm = false;

  constructor() { }

  showMongo() {
    this.showMongoForm = true;
    this.showMySQLForm = false;
  }

  showMySQL() {
    this.showMySQLForm = true;
    this.showMongoForm = false;
  }

  ngOnInit(): void {
  }
  getDataFromBackendmongo(){

  }
  getDataFromBackendsql(){
    
  }
}
