import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  subscribeFunction(res: any): any { return null };
  
  errorFunction(res: any): any { return res };

  subscribe(r: any): any {
    this.subscribeFunction = r;
      return this;
  };

  error(e: any): any {
      this.errorFunction = e;
      return this;
  };

  get(url: string) {
    return this.request(url, "GET");
  }

  post(url: string, body: Object) {
    return this.request(url, "POST", body);
  }

  put(url: string, body: Object) {
    return this.request(url, "PUT", body);
  }

  delete(url: string) {
    return this.request(url, "DELETE");
  }

  request(url: string, method: string, body?: Object) : any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const finalUrl =`${this.baseUrl}/${url}`;

    var request;
    if (body) {
      request = new HttpRequest(method, finalUrl, body, {headers : headers, responseType:'json'});
    }
    else{
      request = new HttpRequest(method, finalUrl, {headers : headers});
    }
   
    let serviceObject=this;
    this.http.request(request)
             .subscribe((res: HttpResponse<any>) =>{
               if (serviceObject.subscribeFunction != null) {
                serviceObject.subscribeFunction(res.body);
              }
             },
             (error: HttpResponse<any>) => {
                const statusCode = error.status;
                const body = error.statusText;

                const errorMessage = {
                  statusCode: statusCode,
                  error: body
                };

                console.log(errorMessage);
                return Observable.throw(error);              
            }
             );
    return this;
  }

}
