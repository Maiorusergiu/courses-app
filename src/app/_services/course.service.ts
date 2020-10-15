import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



import { Course } from '../_model/Course';
import { environment } from '../../environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
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

  deleteCourse(id: number) {
    return this.http.delete(`${environment.apiUrl}/courses/${id}`);
  
  }
  

  
  
 
 
}

