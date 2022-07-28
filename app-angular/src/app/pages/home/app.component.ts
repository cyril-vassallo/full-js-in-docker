import { Component } from '@angular/core';
import { NavigationInterface, UserInterface, TaskInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  titleState: string = 'Login';

  isAuthState: boolean = false;

  userState: UserInterface|null = null;

  tasksState: TaskInterface[]|null = null

  navigationState: NavigationInterface[] = [
    {
      label: "My History",
      path: "/my-history",
      isActive: true,
      title: 'Fill your information',
      componentId: 'app-my-history'
    },
    {
      label: "My Team",
      path: "/my-team",
      isActive: false,
      title: 'Find my team partner history',
      componentId: 'app-my-team'
    },
  ];


  constructor() {
    this.login =  this.login.bind(this)
    this.logout =  this.logout.bind(this)
    this.updateUserState =  this.updateUserState.bind(this)
  }

  ngOnInit(): void {
  }


  onClickNavItem(event?: MouseEvent): void {
    console.log('Clicked nav item! ');
    console.log(event);
  }

  login(user: UserInterface|null|null): void {
    console.log('login')
    this.updateUserState(user)
    this.isAuthState = true;
    this.titleState = 'My Working History'
  }

  logout(): void {
    this.isAuthState = false;
  }

  updateUserState(user: UserInterface|null|null) {
    if(user !== null ){
      this.userState = user;
      console.log(this.userState)
    }
  }


}
