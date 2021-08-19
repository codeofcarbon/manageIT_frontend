import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if( req.url === 'http://localhost:8080/api/v1/users/authenticate' && req.method === 'GET') {
            console.log('Nothing to intercept')
            return next.handle(req)
        }
        req = req.clone({
            withCredentials: true
        });
        return next.handle(req)

    }

}