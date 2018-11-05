import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone({
            headers: req.headers.set("Authorization","Basic YW5kcmVzbmFyYW5qb0BhZm5hcnF1aS5jb206ZmIxNzlmNzE3ZTU2NDg5ODU3ZGY=")
        })
        return next.handle(cloned)
    }
}