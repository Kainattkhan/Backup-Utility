import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  checkedoption: any[] = [];


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  populateTable() {
    if (this.selectedOption === 'option1') {
      //Replace"http://192.168.1.58:8080/mongo/showBackup" with your own API
      this.http.get(`http://192.168.1.62:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            //Replace with your own API
            downloadLink: `http://192.168.1.58:8080/mongo/zip/${key}`
          };
        });
      });
    } else if (this.selectedOption === 'option2') {
      //Replace this "http://192.168.1.58:8080/sql/showBackupFiles" with your API
      this.http.get(`http://192.168.1.62:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key,value]) => {
          return {
            name: key,
            contents: value,
            //Replace with your own API
            downloadLink: `http://192.168.1.62:8080/sql/createzip/${key}`
          };
        });
      });
    }
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
  updateSelectedItems() {
    this.checkedoption = this.filteredData.filter(item => item.selected);
  }
  restoreData(){
    this.checkedoption.forEach(date => {
      if (date.selected) {
        if(this.selectedOption === "option1")
          date.contents.forEach((type:string) =>{
            //Repalce with your own API
            this.http.get(`http://192.168.1.62:8080/mongo/restore/${date.name}/${type}`).subscribe(
              (response) => {
                console.log(response);
                this.toastr.success("Restored Successfully!")
              },
              (error) => {
                
                console.log(error);
                this.toastr.error("Unable to restore!")
              }
            );
          })

          if(this.selectedOption === "option2")

          date.contents.forEach((type:string) =>{
            //Replace with your own API
            this.http.get(`http://192.168.1.62:8080/sql/restore/${date.name}/${type}`).subscribe(
              (response) => {
                console.log(response);
                this.toastr.success("Restored Successfully!")
              },
              (error) => {
                console.log(error);
                this.toastr.error("Unable to restore!")
              }
            );
          })
        }
      });
  }
  
}
    

   
    
     






