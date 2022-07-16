import { Component, Input, OnInit } from '@angular/core';
import { NavigationInterface } from '../../Interfaces/Interfaces';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() navigation!: NavigationInterface[];
  @Input() isAuth!: boolean;
  @Input() handleLoginClick!:() => void;
  @Input() handleNavItemClick!:(event?: MouseEvent) => void;


  constructor() { 
  }

  ngOnInit(): void {
  }

}
