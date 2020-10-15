import { ThrowStmt } from '@angular/compiler';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

import { first, timestamp } from 'rxjs/operators';

import { Course } from '../_model/Course';
import { CourseService } from '../_services/course.service';



@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {
  courses = [];

  constructor(
    
    private courseService: CourseService,
  ) { }
  

  ngOnInit(): void {
    
    
  }
  add(course: Course) {
    this.courseService.addcourse(course)
    .subscribe(course =>{
      this.courses.push(course);
    });
  }
  
}
