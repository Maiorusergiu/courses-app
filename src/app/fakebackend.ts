import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered courses
let courses = JSON.parse(localStorage.getItem('courses')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/create-courses') && method === 'POST':
                    return addCourse();
                case url.endsWith('/courses') && method === 'GET':
                    return getCourses();
                case url.match(/\/courses\/\d+$/) && method === 'GET':
                    return getcourseById();
                case url.match(/\/courses\/\d+$/) && method === 'DELETE':
                    return deleteCourse();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function addCourse() {
            const course = body
           
            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));

            return ok();
        }


        function getCourses() {
            return ok(courses);
        }

        function getcourseById() {
            const course = courses.find(x => x.id == idFromUrl());
            return ok(course);
        }

        function deleteCourse() {
            
            localStorage.setItem('courses', JSON.stringify(courses));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

    
        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
