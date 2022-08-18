import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavigationItemInterface } from '../../Interfaces/Interfaces';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {

  @Input() isAuth!: boolean;
  @Input() handleNavItemClick!: (event?: MouseEvent) => void;
  @Input() logout!: () => void;

  navigationState: NavigationItemInterface[] = [];
  navigationSubscription$: Subscription| null = null;
  navigation: NavigationItemInterface[]| null = null;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationSubscription$ = this.navigationService.getNavigation().subscribe((_event) => {
      this.navigation = _event.data;
    });

  }

  ngOnDestroy(): void {
    this.navigationSubscription$?.unsubscribe();
  }

  onLogoutClick(): void {
    this.logout();
  }
}
