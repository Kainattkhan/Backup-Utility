import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  showMongoForm = false;
  showMySQLForm = false;
  username: string = '';
  password: string = '';
  dbIP: string = '';
  results: any[] = [];
  myForm: FormGroup;
  savedData: any;
  

  constructor(private http: HttpClient, private toastr: ToastrService, private formBuilder: FormBuilder) { 
1
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.maxLength(5)],
      password: ['', Validators.required, Validators.maxLength(4)],
      dbIP: ['', Validators.required]
    });
  }
  ngOnInit(){
    const savedDataString = localStorage.getItem('savedData');
    if (savedDataString) {
      this.savedData = JSON.parse(savedDataString);
      this.username = this.savedData.username;
      this.password = this.savedData.password;
      this.dbIP = this.savedData.dbIP;
    }
  }

  showMongo() {
    this.showMongoForm = true;
    this.showMySQLForm = false;
    this.results=[];
    this.username = ''; 
    this.password = ''; 
    this.dbIP = '';
  }

  showMySQL() {
    this.showMySQLForm = true;
    this.showMongoForm = false;
    this.results=[];
    this.username = ''; 
    this.password = ''; 
    this.dbIP = '';
  }

  handleSaveMongo() {
    const formData = {
      user: this.username,
      pass: this.password,
      host: this.dbIP
    };

    console.log('Form Data:', formData);
    //Replace with your own API
    const URL = `http://192.168.1.62:8080/mongo/saveMongoHost/body`;
  
    this.http.post(URL,formData).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Successfully saved config for SQL');
          this.savedData = {
            username: this.username,
            password: this.password,
            dbIP: this.dbIP
          };
          localStorage.setItem('savedData', JSON.stringify(this.savedData));
        },
        error => {
          console.error('Error saving SQL config:', error);
          this.toastr.error('Error saving config!');
        }
      );
  }
  
  handleSaveSql() {

    const formData = {
      user: this.username,
      pass: this.password,
      host: this.dbIP
    };

    console.log('Form Data:', formData);
    //Replace with your own API
    const URL = `http://192.168.1.62:8080/sql/saveMysqlHost/body`;
  
    this.http.post(URL,formData).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Successfully saved config for SQL');
          this.savedData = {
            username: this.username,
            password: this.password,
            dbIP: this.dbIP
          };
          localStorage.setItem('savedData', JSON.stringify(this.savedData));
        },
        error => {
          console.error('Error saving SQL config:', error);
          this.toastr.error('Error saving config!');
        }
      );
  }

 
  showTable = false;

  viewinTable() {
    if (this.showMongoForm === true) {
      //Replace with your own API
      this.http.get('http://192.168.1.62:8080/mongo/getMongoHost').subscribe((data: any) => {
        this.results = Array.isArray(data) ? data : [data];
        this.showTable = true;
      });
    } else if (this.showMySQLForm === true) {
      //Replace with your own API
      this.http.get('http://192.168.1.62:8080/sql/getMysqlHost').subscribe((data: any) => {
        this.results = Array.isArray(data) ? data : [data];
        this.showTable = true;
      });
    }
  }
  editMongoForm() {

    this.username = ''; 
    this.password = ''; 
    this.dbIP = ''; 
  }
  editMySQLForm() {
   
    this.username = ''; 
    this.password = ''; 
    this.dbIP = '';
  }
}






