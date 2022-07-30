import { Component, Input, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskInterface } from 'src/app/Interfaces/Interfaces';
import { TaskService } from 'src/app/services/task.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor() { }

  task: TaskInterface | null = null;
  isTodayTaskExist: boolean  = false;
  taskInput = new FormControl('');
  commitInput = new FormControl('');
  date: string = new Date().toLocaleString('fr').split(',')[0].trim();
  @Input() hasTask: boolean = false;
  @Input() handleTaskState!: (task: TaskInterface[]|null) => void;
  @Input() tasks: TaskInterface[]|null = null;

  ngOnInit(): void {
  }

  onAddTask(): void {

    this.checkIfTodayTaskExist();

    if (!this.isTodayTaskExist) {
       this.createTask();
    }

    this.updateTaskList()
   
    this.tasks = this.mergeTasks();
  
    this.handleTaskState(this.tasks)

    this.taskInput.setValue("");

  }

  mergeTasks(): TaskInterface[]|null{
    if (this.tasks !== null && this.task !== null && !this.isTodayTaskExist) {
      return this.tasks.concat([this.task]);
    }
    return this.tasks;
  }
  checkIfTodayTaskExist(): void {
    if (this.tasks) {
      const tasks: TaskInterface[] = this.tasks.filter((task) => {
        return task.date == this.date;
      });

      if (tasks.length > 0) {
        console.log("TASK EXIST")
        this.task = tasks[0];
        this.isTodayTaskExist = true;
      } 
    }
  }

  updateTaskList(): void {
    if (this.task && this.taskInput.value !== null) {
      this.task.list.push(this.taskInput.value);
    }
  }

  createTask(): void {
    if (this.tasks && this.taskInput.value !== null) {
      const task: TaskInterface = this.tasks.reduce(function(accumulator: TaskInterface, currentTask: TaskInterface) {
        return currentTask.id > accumulator.id ? currentTask : accumulator;
      }, this.tasks[0]);

      const newTask: TaskInterface = { ...task };
    
      //transforme the last task into a today new task
      newTask.id = newTask.id + 1;
      newTask.commits = [];
      newTask.list = [];
      newTask.date = this.date;
      this.task = newTask;

    }
  }
  

}
