import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Course } from '../_model/Course';
import { CreateCoursesComponent } from '../create-courses/create-courses.component';
import { environment } from '../../environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public course: Observable<Course>
  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  addcourse(course: Course) {
    return this.http.post<Course>(`${environment.apiUrl}/create-courses`, course)
  }



  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  deleteCourse() {
    

  }
  

  
  
 
 
}

