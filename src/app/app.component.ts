import { Component } from '@angular/core';
import { Course } from './_model/Course';
import { CourseService } from './_services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses: Course;

  constructor(private courseService: CourseService){}
}
