import { Component, OnInit, Input } from '@angular/core';
import { UserInterface, GithubInterface } from '../../Interfaces/Interfaces';
import { GithubService } from '../../services/github.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  @Input() user!: UserInterface|null;
  @Input() isFeatureActive: boolean = false;
  githubState: GithubInterface|null = null;
  enabled: boolean = false;
  hasError: boolean = true;
  isMessageDisplayed: boolean = false; 
  githubForm = new FormGroup({
    owner: new FormControl(''),
    repository: new FormControl(''),
    branch: new FormControl(''),
    token: new FormControl(''),
    enabled: new FormControl(false),
  });

  subscriptions: Subscription = new Subscription()

  constructor(private githubService: GithubService) {}

  // ----- Component lifecycle methods ----- //


  ngOnInit(): void {
    this.loadUserGithub();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods----- //

  onGithubFormSubmit(): void {
    this.checkRepository();
    this.toggleMessageDisplay(true)
  }

  onEnableCLick() {
    this.toggleGithubEnabling();

  }

  loadUserGithub(): void {
    if(this.user !== null ){
      this.subscriptions.add(this.githubService.getGithubByUser(this.user).subscribe((_observer: GithubInterface|null) => {
        this.githubState = _observer;
        this.updateFormValues();
      }));
    }
  }

  updateFormValues(): void {
    if(this.githubState !== undefined && this.githubState !== null) {
      this.githubForm.setValue({
        owner: this.githubState.owner ?? '',
        repository: this.githubState.repository ?? '',
        branch: this.githubState.branch ?? '',
        token: this.githubState.token ?? '',
        enabled: this.githubState.enabled ?? false
      })
    }

    if(this.githubState?.enabled) {
      this.githubForm.controls.owner.enable();
      this.githubForm.controls.repository.enable();
      this.githubForm.controls.branch.enable();
      this.githubForm.controls.token.enable();
    } else {
      this.githubForm.controls.owner.disable();
      this.githubForm.controls.repository.disable();
      this.githubForm.controls.branch.disable();
      this.githubForm.controls.token.disable();
    }

  } 

  isGithubActive() {
    return this.githubForm.get('enabled')?.getRawValue()
  }

  toggleGithubEnabling(): void {  
    const enabled: boolean = !this.githubForm.controls.enabled.value;

    if(enabled) {
      this.githubForm.controls.owner.enable();
      this.githubForm.controls.repository.enable();
      this.githubForm.controls.branch.enable();
      this.githubForm.controls.token.enable();
      this.githubForm.controls.enabled.setValue(true)
    } else {
      this.githubForm.controls.owner.disable();
      this.githubForm.controls.repository.disable();
      this.githubForm.controls.branch.disable();
      this.githubForm.controls.token.disable();
      this.githubForm.controls.enabled.setValue(false)

      if(this.githubState !== null && this.githubForm.controls.enabled.value === false ){
        this.githubState.enabled = this.githubForm.controls.enabled.value;
        this.updateRepository();
        this.toggleMessageDisplay(false);
      } 

    }
  }

  checkRepository(): void {
    if(this.githubState){
      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;
      this.githubState.token = this.githubForm.controls.token.value!;
      
      this.subscriptions.add(this.githubService.checkGithubRepository(this.githubState)
        .subscribe( (_observer: any) => {
          console.log('CHECK GIT');
          _observer.status === 404 || _observer.status === 403  ? this.hasError = true : this.hasError = false
          if(!this.hasError){
            this.updateRepository();
          }
      }));
    }
  }

  updateRepository(): void {
    if (this.githubState && this.user?.id) {
      
      this.githubState.user =  this.user?.id;
      this.githubState.enabled = this.githubForm.controls.enabled.value!;
      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;
      this.githubState.token = this.githubForm.controls.token.value!;

      this.subscriptions.add(this.githubService.postGithub(this.githubState).subscribe( (_observer: GithubInterface) => {
          console.log('UPDATE GIT')
          console.log(_observer)
      }));
    }
  }

  toggleMessageDisplay(isDisplayed: boolean): void {
    isDisplayed ? this.isMessageDisplayed = true : this.isMessageDisplayed = false; 
  }



}
