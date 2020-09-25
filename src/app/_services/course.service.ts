import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


import { Course } from '../_model/Course';
import { CreateCoursesComponent } from '../create-courses/create-courses.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseSubject: BehaviorSubject<Course>;
  public course: Observable<Course>;
  

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.courseSubject = new BehaviorSubject<Course>(JSON.parse(localStorage.getItem('course')));
        this.course = this.courseSubject.asObservable();
  }
  public get courseValue(): Course {
    return this.courseSubject.value;
  }

  addCourse (course: Course) {
    return this.http.post(`${environment.apiUrl}/courses`, course)
  }
  getAll () {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }
  getById(id: string) {
    return this.http.get<Course>(`${environment.apiUrl}/courses/${id}`);
  }
  editCourse(id, params) {
    return this.http.put(`${environment.apiUrl}/courses/${id}`, params)
    .pipe(map(x => {
      const course = {...this.courseValue, ...params };
      localStorage.setItem('course', JSON.stringify(course));

      this.courseSubject.next(course);
      return x;
    }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/courses/${id}`)
    .pipe(map(x => {
      return x;
    }))
  }
  
 
 
}

