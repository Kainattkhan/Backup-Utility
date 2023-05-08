import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restorebackup',
  templateUrl: './restorebackup.component.html',
  styleUrls: ['./restorebackup.component.css']
})
export class RestorebackupComponent implements OnInit {
  selectedOption: string;
  selectedDate: '';
  filteredData: any[] = [];
  selectAllChecked = false;
  tableRendered: boolean = false;
  dataShow:any;
  checkedoptions: any[] = [];


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  sqlData(option: string){
    this.filteredData = [];
    this.selectedDate=''
    this.tableRendered = false;  
    this.selectedOption = option;
  }

  mongoData(option:string){
    this.filteredData = [];
    this.selectedDate=''
    this.tableRendered = false;  
    this.selectedOption = option;
  } 

  selectAll() {
    //checks wheather the selected property is true on each item or not
    const allSelected = this.filteredData.every(item => item.selected);
    
    //assigns negation to the selected property of each item (if items are checked, it will uncheck and viceversa)
    this.filteredData.forEach(item => item.selected = !allSelected);

    if (allSelected) {
      // If "select all" is unchecked, clear the checkedoptions array
      this.checkedoptions = [];
    } else {
      // If "select all" is checked, add all items to the checkedoptions array
      this.checkedoptions = [...this.filteredData];
    }
  }

  updateSelectedItems() {
    this.checkedoptions = this.filteredData.filter(item => item.selected);
  }

  populateTable() {
    if (this.selectedOption === 'option1') {
      this.http.get(`http://localhost:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://localhost:8080/mongo/zip/${key}/${value}`
          };
        });
      });
    } else if (this.selectedOption === 'option2') {
      this.http.get(`http://localhost:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key,value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://localhost:8080/sql/createzip/${key}`
          };
        });
      });
    }
  }

  restoreData(){
    this.checkedoptions.forEach(date => {
      if (date.selected) {
        if(this.selectedOption === "option1")
          date.contents.forEach((type:string) =>{
            this.http.get(`http://localhost:8080/mongo/restore/${date.name}/${type}`).subscribe(
              (response) => {
                const result= 
                // handle success
                console.log(response);
              },
              (error) => {
                // handle error
                console.log(error);
              }
            );
          })

          if(this.selectedOption === "option2")

          date.contents.forEach((type:string) =>{
            this.http.get(`http://localhost:8080/sql/restore/${date.name}/${type}`).subscribe(
              (response) => {
                // handle success
                console.log(response);
              },
              (error) => {
                // handle error
                console.log(error);
              }
            );
          })
        }
      });
  }
     
}










