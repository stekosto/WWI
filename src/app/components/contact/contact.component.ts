import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactform') form: any;
  formValue: any;
  subjects: Array<Object> = [
    {name: 'Please choose a subject', value: '1'} ,
    {name: 'Products', value: '2'},
    {name: 'Shipping', value: '3'},
    {name: 'Website', value: '4'},
  ];
  constructor() { }

  ngOnInit() {
  }

  log(logNameInput) {
    console.log(logNameInput);

  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.formValue = JSON.stringify(value, null, 3);
      alert(
         this.formValue
      );
    }
  }

}
