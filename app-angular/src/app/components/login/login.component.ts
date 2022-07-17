import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  @Input() handleLoginClick!:() => void;
  @Input() user!: UserInterface;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitUser(event:MouseEvent): void {
    if(this.user.email == this.email && this.user.password === this.password){
      this.handleLoginClick()
    }

  }

}
