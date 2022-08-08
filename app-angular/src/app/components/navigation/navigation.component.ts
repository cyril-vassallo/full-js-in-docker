import { Component, Input, OnInit } from '@angular/core';
import { NavigationInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() navigation!: NavigationInterface[];
  @Input() isAuth!: boolean;
  @Input() handleNavItemClick!: (event?: MouseEvent) => void;
  @Input() logout!: () => void;

  constructor() {}

  ngOnInit(): void {}

  onLogoutClick(): void {
    this.logout();
  }
}
