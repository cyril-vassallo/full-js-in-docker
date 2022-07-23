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

  userState: UserInterface = {
    firstName: 'John',
    lastName:  'Doe',
    password: "demo",
    email: "jd@demo.fr",
    job: 'Javascript Web Developer',
    photo: 'tpdne-1',
    description: "I'am a web developer and i really enjoy Javascript ecosystem. In the future i hope to become JS Expert "
  };

  tasksState: TaskInterface[] = [ 
    {
      list: [
        'fix stack starting',
        'add bootstrap as UI dependency'
      ],
      date: '2022-14-07',
      commitHashes :['ab14f15e7145']
    },
    {
      list: [
        'upgrade node version',
        'fix depreciation in code',
        'add new images in asset'
      ],
      date: '2022-15-07',
      commitHashes :['ae11b15e719', 'a4578bef5g4']
    }
  ] 

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

  login(): void {
    console.log('login')
    this.isAuthState = true;
    this.titleState = 'My Working History'
  }

  logout(): void {
    this.isAuthState = false;
  }

  updateUserState(user: UserInterface|null) {
    if(user !== null ){
      this.userState = user;
      console.log(this.userState)
    }
  }


}
