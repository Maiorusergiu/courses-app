import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { CourseService } from '../_services/course.service';



@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {
  id: string;
  Add: boolean;
  submitted: false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) { }
  

  ngOnInit(): void {
    
  }
 

}
