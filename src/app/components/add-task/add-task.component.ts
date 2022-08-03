import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  todo: string;
  time: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService:UiService) { 
    this.todo = ''
    this.time = ''
    this.showAddTask = false;
    this.subscription = this.uiService.onToggle().subscribe(e=>(this.showAddTask = e))
  
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.todo) {
      alert('Please add a task!')
      return;
    }

    const newTask = {
      todo: this.todo,
      time:this.time,
      reminder:this.reminder
    }
    this.onAddTask.emit(newTask);

    this.todo = '';
    this.time = '';
    this.reminder = false;

  }

}
