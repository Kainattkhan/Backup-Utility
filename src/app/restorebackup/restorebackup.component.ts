import { Component, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-restorebackup',
  templateUrl: './restorebackup.component.html',
  styleUrls: ['./restorebackup.component.css']
})
export class RestorebackupComponent implements OnInit {
  selectedOption: string;
  results: any;
  selectedDate: string;
  filteredData: any[] = [];

  ngOnInit(): any {
  }
  constructor(public authService:AuthServiceService) {
    this.selectedDate='';
    this.results = [];
  }

  data: any[] = [
    {
      fileName: 'document1.docx',
      date: '2023-03-31',
      downloadLink: 'https://example.com/document1.docx'
    },
    {
      fileName: 'document2.docx',
      date: '2023-03-31',
      downloadLink: 'https://example.com/document1.docx'
    },
    {
      fileName: 'document3.docx',
      date: '2023-03-31',
      downloadLink: 'https://example.com/document1.docx'
    },
    {
      fileName: 'document4.docx',
      date: '2023-03-31',
      downloadLink: 'https://example.com/document1.docx'
    },
    {
      fileName: 'document5.docx',
      date: '2023-03-31',
      downloadLink: 'https://example.com/document1.docx'
    },
    {
      fileName: 'document2.pdf',
      date: '2022-04-01',
      downloadLink: 'https://example.com/document2.pdf'
    },
    {
      fileName: 'document3.xlsx',
      date: '2023-03-20',
      downloadLink: 'https://example.com/document3.xlsx'
    },
    {
      fileName: 'document4.pptx',
      date: '2022-03-20',
      downloadLink: 'https://example.com/document4.pptx'
    },
    {
      fileName: 'document5.txt',
      date: '2022-04-12',
      downloadLink: 'https://example.com/document5.txt'
    },
    {
      fileName: 'document6.zip',
      date: '2022-04-12',
      downloadLink: 'https://example.com/document6.zip'
    }
  ];

  selectAllChecked = false;

  // toggleSelectAll() {
  //   this.data.forEach(item => item.selected = this.selectAllChecked);
  // }

  toggleSelectAll() {
    this.filteredData.forEach(item => item.selected = this.selectAllChecked);
  }

 //to keep track of which radio is selected
  //When a radio button is clicked, it triggers the (click) event
  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  populateTable() {
    this.results=this.selectedDate;
    this.filteredData = this.data.filter(item => item.date === this.selectedDate);
    
  }

  sqlData(option: string){
    this.results=[]
    this.filteredData=[]
    this.selectedDate=''
    this.selectedOption = option;
}

  mongoData(option:string){
    this.results=[]
    this.filteredData=[]
    this.selectedDate=''
    this.selectedOption = option;
} 

}