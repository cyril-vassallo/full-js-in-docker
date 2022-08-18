import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {

  constructor() { }


  @Input() user!: UserInterface|null;
  @Input() isFeatureActive: boolean = false;

  ngOnInit(): void {
  }

}
