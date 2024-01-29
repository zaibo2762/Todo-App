import { CommonModule } from '@angular/common';
import { Component,  inject} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchControl= new FormControl("")
  stateService = inject(StateService)
  ngOnInit(){
    this.searchControl.valueChanges.subscribe((value)=>{
      this.stateService.searchSubject.next(value || "")
      

    })
  }
}
