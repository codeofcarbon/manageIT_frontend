import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if( req.url === 'http://localhost:8080/api/v1/users' && req.method === 'POST') {
            console.log('Nothing to intercept')
            return next.handle(req)
        }
        const user = JSON.parse(localStorage.getItem('currentUser'))
        console.log(user)
        
        const auth = req.clone({
            headers: req.headers.set('Authorization', 'Basic ' + btoa(`${user.username}:${user.password}`))
        });
        return next.handle(auth)

    }

}