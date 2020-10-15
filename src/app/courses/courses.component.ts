import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_model/Course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses = [];

  constructor(private courseService: CourseService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.courseService.getCourses()
    .subscribe(courses => this.courses = courses);
    
  }

  
delete(id: number) {
 

}

    
  
  

  

}
