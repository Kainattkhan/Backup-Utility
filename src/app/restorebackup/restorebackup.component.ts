import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-restorebackup',
  templateUrl: './restorebackup.component.html',
  styleUrls: ['./restorebackup.component.css']
})
export class RestorebackupComponent implements OnInit {

  results: { option: string, result: string, download:string }[];

  constructor(private http:HttpClient) { 
    this.results = [];
  }

  ngOnInit():void {
    
  }

  showIcon=false;
  selectedOption: string;
  showTable = false;
  image:any;
  

  showCalendarIcon() {
    this.showIcon=true;
  }
  // showdata(){
  //   this.http.get('https://dog.ceo/api/breeds/image/random').subscribe((Response)=>{
  //     this.image=Response;


  //   },(error)=>{
  //     console.log(error)
  //   })
    
  // }

  
}

