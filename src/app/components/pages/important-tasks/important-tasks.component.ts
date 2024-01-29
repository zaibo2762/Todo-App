import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../../task-list/task-list.component';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [TaskListComponent,PageTitleComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
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
      this.taskList= result.filter((x:any)=>x.important==true);
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
