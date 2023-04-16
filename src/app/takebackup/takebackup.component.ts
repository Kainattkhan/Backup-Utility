import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-takebackup',
  templateUrl: './takebackup.component.html',
  styleUrls: ['./takebackup.component.css']
})
export class TakebackupComponent implements OnInit {
  
  selectedOption: string;
  options: string[];
  selectedOptions: string[];
  results: { option: string, result: string, download:string }[];

  ngOnInit(): any {
  }

  constructor(private http: HttpClient, public authService:AuthServiceService) {
    this.options = ['Document', 'Notes', 'Employees Data', 'Staff data', 'Office Details', 'mongo', ''];
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

  showResults() {
    // Here, you can make a call to your database to fetch the results based on the selected options.
    // For this example, we'll just create some dummy results.
    this.results = this.selectedOptions.map(option => {
      return {
        option: option,
        result: `Result for ${option}`,
        download:option
      }
    });
  
  }


}


