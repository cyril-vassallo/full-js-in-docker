import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

@Input() user!: UserInterface|null;
@Input() isFormDisplayed: boolean = false;

  constructor() { }

  buttonText: string = 'Archive today tasks!'
  @Input() handleToggleForm!: () => void;

  ngOnInit(): void {

  }

  openForm(): void {
    this.handleToggleForm()
  }

}
