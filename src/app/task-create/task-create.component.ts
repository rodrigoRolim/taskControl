import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  value:Number;
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.value = params['id'];
     console.log(this.value);
    });
    
  }
  getContainer():{} {
    
    console.log(this.value);
    return {
      'container-b': this.value == 1 ? true: false,
      'container-r': this.value == 2 ? true: false,
      'container-g': this.value == 3 ? true: false
    };
  }
}
