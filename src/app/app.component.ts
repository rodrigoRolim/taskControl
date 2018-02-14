import { Component,OnInit } from '@angular/core';
import { Task } from './task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  value:Number;
  
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.value = params['id'];
     console.log(this.value); 
    });
  }
 
}
