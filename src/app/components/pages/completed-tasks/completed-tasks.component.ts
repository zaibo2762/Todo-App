import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { TaskListComponent } from '../../task-list/task-list.component';
import { PageTitleComponent } from '../../page-title/page-title.component';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [TaskListComponent,PageTitleComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
  newTask=""
  taskList:any[]=[]
  
  httpService = inject(HttpService)
  ngOnInit(){
    this.getallTask()
  }
  addtask(){
    this.httpService.addTask(this.newTask).subscribe(()=>{
      this.newTask=""; 
      this.getallTask()
    })
  }
  getallTask(){
     this.httpService.getallTask().subscribe((result:any)=>{
      this.taskList= result.filter((x:any)=>x.completed==true);
    })
  }
  oncomplete(task:any){
    task.completed= true
    this.httpService.updateTask(task).subscribe(()=>{
      this.getallTask()
    })
    
}
onimportant(task:any){
  task.important= true
  this.httpService.updateTask(task).subscribe(()=>{
    this.getallTask()
    })
}
}
