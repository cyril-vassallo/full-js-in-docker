import { Component, Input, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskInterface } from 'src/app/Interfaces/Interfaces';
 

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
  date: string = new Date().toLocaleString('fr').split(' ')[0];
  @Input() hasTask: boolean = false;
  @Input() handleTaskState!: (tasks: TaskInterface[]|null, task: TaskInterface|null) => void;
  @Input() tasks: TaskInterface[]|null = null;

  ngOnInit(): void {
  }

  onAddTask(): void {

    this.isTodayTaskExist = this.checkIfTodayTaskExist(this.tasks, this.date);

    if (!this.isTodayTaskExist) {
       this.createTask();
    }

    this.task = this.updateTaskList(this.task, this.taskInput.value)
   
    if (this.tasks !== null && this.task !== null && !this.isTodayTaskExist) {
      this.tasks = this.mergeTasks(this.tasks, this.task);
    }
  
    this.handleTaskState(this.tasks, this.task)

    this.taskInput.setValue("");

  }

  mergeTasks( tasks: TaskInterface[], task: TaskInterface): TaskInterface[]{
    tasks.unshift(task);
    return tasks;
  }

  checkIfTodayTaskExist(tasks: TaskInterface[]|null, date: string): boolean {
    if (tasks) {
      const todayTasks: TaskInterface[] = tasks.filter((task) => {
        return task.date == date;
      });

      if (todayTasks.length > 0) {
        console.log("TASK EXIST")
        this.task = todayTasks[0];
        return true;
      } 
    }
    return false;
  }

  updateTaskList(task: TaskInterface|null, taskInputValue: string|null): TaskInterface|null {
    if (task !== null && taskInputValue !== null) {
      task.list.push(taskInputValue);
    }
    return task;
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
