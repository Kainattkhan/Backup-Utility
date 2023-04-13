import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-restorebackup',
  templateUrl: './restorebackup.component.html',
  styleUrls: ['./restorebackup.component.css']
})
export class RestorebackupComponent implements OnInit {

  constructor(public authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  data: any[] = [
    {
      fileName: 'document1.docx',
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

  selectedDate: string = '';

  filteredData: any[] = [];

  populateTable() {
    if (this.selectedDate === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(item => item.date === this.selectedDate);
    }
  }

}
