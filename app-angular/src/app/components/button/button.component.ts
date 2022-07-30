import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() handleToggleForm!: () => void;

  ngOnInit(): void {
  }

  openForm(): void {
    this.handleToggleForm()
  }

}
