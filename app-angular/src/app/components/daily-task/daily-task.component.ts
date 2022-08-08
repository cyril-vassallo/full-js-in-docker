import { Component, Input, OnInit } from '@angular/core';
import { TaskInterface, UserInterface } from 'src/app/Interfaces/Interfaces';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.scss'],
})
export class DailyTaskComponent implements OnInit {
  @Input() tasks!: TaskInterface[] | null;
  @Input() teamPartner!: UserInterface | null;
  @Input() user!: UserInterface | null;

  usersState: UserInterface[] | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.teamPartner !== null) {
      console.log('HasTeamParnner');
      this.user = this.teamPartner;
    }
  }

  getAvatar(): string {
    if (this.teamPartner) {
      return this.teamPartner.photo;
    } else {
      if (this.user) {
        return this.user.photo;
      }
      return 'image/default.jpg';
    }
  }
}
