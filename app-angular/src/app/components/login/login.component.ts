import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  users: UserInterface[] = []

  @Input() handleLoginClick!:() => void;
  @Input() user!: UserInterface;

  constructor(private loginService: UserService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
  }

  onClickSubmitUser(data: any) {
    this.loginService.getAllUsers(data, this.updateUser)
    if (this.users.length > 0 ) {
      this.handleLoginClick()
    }
  }

  updateUser(users: UserInterface[]) {
    console.log(users)
    this.users = users;
  }

}
