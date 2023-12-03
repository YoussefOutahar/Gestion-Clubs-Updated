import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clubCreation',
  templateUrl: './clubCreation.component.html',
  styleUrls: ['./clubCreation.component.css']
})
export class ClubCreationComponent implements OnInit {

  clubFormGroup = new FormGroup({
  });
  secondFormGroup = new FormGroup({
  });
    

  constructor() { }

  ngOnInit() {
  }

}
