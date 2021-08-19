import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { BasicAuthInterceptor } from "./http-interceptor"


export const httpInterceptorsProviders = {
       provide: HTTP_INTERCEPTORS,
       useClass: BasicAuthInterceptor,
       multi: true
}