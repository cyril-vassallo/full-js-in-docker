import { Component, Input, OnChanges } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnChanges {
  @Input() buttonText: string = 'Archive today tasks!';
  @Input() isFormDisplayed: boolean = false;
  @Input() handleToggleForm!: () => void;
  @Input() teamPartner!: UserInterface | null;
  disabledSate: boolean = true;

  constructor() {}

  ngOnChanges(): void {
    this.teamPartner !== null
      ? (this.disabledSate = true)
      : (this.disabledSate = false);
  }

  openForm(): void {
    this.handleToggleForm();
  }
}
