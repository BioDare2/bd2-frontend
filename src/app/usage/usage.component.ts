import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bd2-usage',
  templateUrl: './usage.component.html',
  standalone: false
})
export class UsageComponent implements OnInit {
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
  }
}