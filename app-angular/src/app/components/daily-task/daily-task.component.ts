import { Component, Input, OnInit } from '@angular/core';
import { TaskInterface } from 'src/app/Interfaces/Interfaces';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.scss']
})
export class DailyTaskComponent implements OnInit {

@Input() tasks! : TaskInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
