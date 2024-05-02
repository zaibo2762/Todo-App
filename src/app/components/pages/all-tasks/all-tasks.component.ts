import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule,DatePipe,PageTitleComponent,TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent {
  newTask=""
  taskList:any[]=[]
  initialtaskList:any[]=[]
  
  httpService = inject(HttpService)
  stateService = inject(StateService)
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList=this.taskList.filter((x)=>x.title.toLowerCase().include(value.toLowerCase()))
      }else{
        this.taskList=this.initialtaskList
      }
    })
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
      this.initialtaskList= this.taskList = result;
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
