// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-restorebackup',
//   templateUrl: './restorebackup.component.html',
//   styleUrls: ['./restorebackup.component.css']
// })
// export class RestorebackupComponent implements OnInit {
//   selectedOption: string;
//   selectedDate: '';
//   filteredData: any[] = [];
//   selectAllChecked = false;
//   tableRendered: boolean = false;
//   dataShow:any;

//   formatDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${month}-${day}-${year}`;
//   }

//   ngOnInit(): any {
//   }
//   constructor(private http: HttpClient) {}

//   selectAll() {
//     for (let item of this.filteredData) {
//       item.selected = !item.selected;
//     }
//   }

//   onOptionSelected(option: string) {
//     this.selectedOption = option;
//   }
//   populateTable() {
//     if (this.selectedOption === 'option1') {
//       this.http.get(`http://localhost:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
//         this.filteredData = Object.entries(data).map(([key, value]) => {
//           return {
//             name: key,
//             contents: value
//           };
//         });
//       });
//     } else if (this.selectedOption === 'option2') {
//       this.http.get(`http://localhost:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
//         this.filteredData = Object.entries(data).map(([key, value]) => {
//           return {
//             name: key,
//             contents: value
//           };
//         });
//       });
//     }
//   }
  
//   sqlData(option: string){
//     this.filteredData = [];
//     this.selectedDate=''
//     this.tableRendered = false;  
//     this.selectedOption = option;
// }

//   mongoData(option:string){
//     this.filteredData = [];
//     this.selectedDate=''
//     this.tableRendered = false;  
//     this.selectedOption = option;
// } 

// }





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



  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  selectAll() {
    for (let item of this.filteredData) {
      item.selected = !item.selected;
    }
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  // downloadFile(downloadLink: string): void {
  //   this.http.get(downloadLink, { responseType: 'blob' }).subscribe(blob => {
  //     const a = document.createElement('a');
  //     const objectUrl = URL.createObjectURL(blob);
  //     a.href = objectUrl;
  //     a.download = downloadLink.substr(downloadLink.lastIndexOf('/') + 1);
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(objectUrl);
  //   });
  // }

  populateTable() {
    if (this.selectedOption === 'option1') {
      this.http.get(`http://localhost:8080/mongo/showBackup/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://localhost:8080/mongo/zip/${key}`
          };
        });
      });
    } else if (this.selectedOption === 'option2') {
      this.http.get(`http://localhost:8080/sql/showBackupFiles/${this.formatDate(new Date(this.selectedDate))}`).subscribe((data: any) => {
        this.filteredData = Object.entries(data).map(([key, value]) => {
          return {
            name: key,
            contents: value,
            downloadLink: `http://localhost:8080/sql/createzip/${key}`
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
}




