import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { HomeComponent } from './home/home.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'createCourses', component: CreateCoursesComponent},
  { path: 'editCourses', component: EditCoursesComponent},
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

