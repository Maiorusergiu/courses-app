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
                case url.endsWith('/courses/register') && method === 'POST':
                    return register();
                case url.endsWith('/courses/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/courses') && method === 'GET':
                    return getcourses();
                case url.match(/\/courses\/\d+$/) && method === 'GET':
                    return getcourseById();
                case url.match(/\/courses\/\d+$/) && method === 'DELETE':
                    return deletecourse();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function register() {
            const course = body

            if (courses.find(x => x.coursename === course.coursename)) {
                return error('coursename "' + course.coursename + '" is already taken')
            }

            course.id = courses.length ? Math.max(...courses.map(x => x.id)) + 1 : 1;
            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));

            return ok();
        }

        function authenticate() {
            const { coursename, password } = body;
            const course = courses.find(x => x.coursename === coursename && x.password === password);
            if (!course) return error('coursename or password is incorrect');
            return ok({
                id: course.id,
                coursename: course.coursename,
                firstName: course.firstName,
                lastName: course.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getcourses() {
            if (!isLoggedIn()) return unauthorized();
            return ok(courses);
        }

        function getcourseById() {
            if (!isLoggedIn()) return unauthorized();

            const course = courses.find(x => x.id == idFromUrl());
            return ok(course);
        }

        function deletecourse() {
            if (!isLoggedIn()) return unauthorized();

            courses = courses.filter(x => x.id !== idFromUrl());
            localStorage.setItem('courses', JSON.stringify(courses));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
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
