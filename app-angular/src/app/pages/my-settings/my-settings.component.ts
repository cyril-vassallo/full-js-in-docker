import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/Interfaces/Interfaces';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent implements OnInit {
  userState: UserInterface | null = null;

  constructor() {}

  ngOnInit(): void {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.userState = JSON.parse(user);
    }
  }
}
