import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user!: UserInterface | null;
  @Input() handleLoadUserTasks!: (user: UserInterface | null) => void;

  constructor() {}

  ngOnInit(): void {}

  onUserProfileClick() {
    if (this.user !== null) {
      this.handleLoadUserTasks(this.user);
    }
  }
}
