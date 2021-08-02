import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    user
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.user = JSON.parse(localStorage.getItem('currentUser'))
        console.log(this.user)
        
        const auth = req.clone({
            headers: req.headers.set('Authorization', 'Basic ' + btoa(`${this.user.username}:${this.user.password}`))
        });
        return next.handle(auth)

    }

}