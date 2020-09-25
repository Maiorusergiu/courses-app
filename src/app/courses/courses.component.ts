import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_model/Course';
import { first } from 'rxjs/operators';
import { UrlSerializer } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = null;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAll()
    // first value
    .pipe(first())
    .subscribe(courses => this.courses = courses)
    
  }
  deleteCourse (id: string) {
    const course = this.courses.find(x => x.id === id);
    course.isDeleting = true;
    this.courseService.delete(id)
    .pipe(first())
    .subscribe(() => this.courses = this.courses.filter(x => x.id !== x.id));

  }

}
