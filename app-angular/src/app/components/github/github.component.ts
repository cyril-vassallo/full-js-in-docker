import { Component, OnInit, Input } from '@angular/core';
import { UserInterface, GithubInterface } from '../../Interfaces/Interfaces';
import { GithubService } from '../../services/github.service';
import { GithubAndMeta } from '../../types/types';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError} from 'rxjs/operators';
import { of, Subscription, Observable } from 'rxjs';


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

  githubObservable$: Observable<GithubAndMeta>|null = null
  githubCheckingObservable$: Observable<GithubAndMeta>|null = null
  githubUpdateObservable$: Observable<GithubAndMeta>|null = null
  gitUpdateSubscription$: Subscription| null = null;
  gitCheckingSubscription$: Subscription| null = null;
  gitGetByUserSubscription$: Subscription| null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.initGithubState();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.gitUpdateSubscription$?.unsubscribe();
    this.gitCheckingSubscription$?.unsubscribe();
    this.gitGetByUserSubscription$?.unsubscribe();
  }
  
  onGithubFormSubmit(): void {
    this.checkRepository();
    this.toggleMessageDisplay(true)
  }

  onEnableCLick() {
    this.toggleGithubEnabling();

  }


  initGithubState(): void {
    if(this.user){
      this.gitGetByUserSubscription$ = this.githubService.getGithubByUser(this.user).subscribe( (_observer: GithubAndMeta) => {
        console.log('GET GIT')
        this.githubState = {..._observer.data};
        this.updateFormValues();
      })
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

  checkRepository(): any {
    if(this.githubState){
      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;
      this.githubState.token = this.githubForm.controls.token.value!;
      
      this.gitCheckingSubscription$ = this.githubService.checkGithubRepository(this.githubState)
        .pipe(
          catchError(err => of({status : err.status}))
        )
        .subscribe( (_event: any) => {
          console.log('CHECK GIT');
          _event.status === 404 || _event.status === 403  ? this.hasError = true : this.hasError = false
          if(!this.hasError){
            this.updateRepository();
          }
      })
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

      this.gitUpdateSubscription$ = this.githubService.postGithub(this.githubState)
        .pipe(catchError(err => of({status : err.status})))
        .subscribe( (_event: any) => {
          console.log('UPDATE GIT')
          console.log(_event)
          _event.status === 404 || _event.status === 403  ? this.hasError = true : this.hasError = false
      })
    }
  }

  toggleMessageDisplay(isDisplayed: boolean): void {
    isDisplayed ? this.isMessageDisplayed = true : this.isMessageDisplayed = false; 
  }



}
