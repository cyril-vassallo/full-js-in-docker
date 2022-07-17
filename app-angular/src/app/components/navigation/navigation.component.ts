import { Component, Input, OnInit } from '@angular/core';
import { NavigationInterface, UserInterface } from '../../Interfaces/Interfaces';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() navigation!: NavigationInterface[];
  @Input() handleNavItemClick!:(event?: MouseEvent) => void;
  @Input() isAuth!: boolean;


  constructor() { 
  }

  ngOnInit(): void {
  }

  handleLogoutClick(): void {
    this.onClickLogout()
  }


}
