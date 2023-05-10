import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takebackup',
  templateUrl: './takebackup.component.html',
  styleUrls: ['./takebackup.component.css']
})
export class TakebackupComponent implements OnInit {
  
  selectedOption: string;
  options: string[];
  selectedOptions: string[];
  results: any;
  dropdownData:string[];
  dataBackup:any;

  constructor(private http: HttpClient) {
    this.selectedOptions = [];
    this.results = [];
    
  }
  //to keep track of which radio is selected
  //When a radio button is clicked, it triggers the (click) event 
  onOptionSelected(option: string) {
    this.selectedOption = option;
    
  }

  //when an option is selected or deselected by user
  onOptionChange(event: any) {
    if (event.target.checked) {
      this.selectedOptions.push(event.target.value);
    } else {
      const index = this.selectedOptions.indexOf(event.target.value);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
  }

  //it loads databases from specific servers
  showResults() {
    let val;
    if(this.selectedOption==="option1"){
      val="mongo/backup";    
    } else{
      val="sql/getbackup";
    }
    this.http.get(`http://localhost:8080/${val}/${this.selectedOptions}`).subscribe((data) => {
      if (data) {   
        this.dataBackup = data;
        this.results = this.dataBackup.map((dropdownData: any) => {
          return {
            option: this.selectedOption === "option1"?dropdownData.Database:dropdownData.database,
            result: dropdownData.Date,
            downloadLink: this.selectedOption === "option1"?`http://localhost:8080/mongo/zip/${dropdownData.Date}/${dropdownData.Database}`:`http://localhost:8080/sql/createzip/${dropdownData.Date}`
          }
        });
      }
    });
  }

  getDataFromBackendsql(option: string) {
    this.results  = [];
    this.dropdownData = [];
    this.selectedOption = option;
    this.http.get('http://localhost:8080/sql/alldatabases').subscribe((data) => {
      if (data) {      
         this.dropdownData = Object.values(data);
         console.log(this.dropdownData)
      }
    });
  }

  getDataFromBackendmongo(option: string) {
    this.results  = [];
    this.selectedOption = option;
    this.dropdownData = [];
    this.http.get('http://localhost:8080/mongo/showAll').subscribe((data) => {
      if (data) {
        this.dropdownData = Object.values(data);
      }
    });
  }

  ngOnInit(): void {
  }
}
