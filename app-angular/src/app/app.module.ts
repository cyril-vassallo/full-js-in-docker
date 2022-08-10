import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHistoryComponent } from './pages/my-history/my-history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TeamComponent } from './components/team/team.component';
import { FormButtonComponent } from './components/buttons/form-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MyHistoryComponent,
    MySettingsComponent,
    NavigationComponent,
    ProfileComponent,
    DailyTaskComponent,
    LoginComponent,
    TaskFormComponent,
    TeamComponent,
    FormButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
