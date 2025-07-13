import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  serviceHost = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // GET FUNCTION 
  getFunction(url: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.serviceHost + url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    GetFunction(url: string, token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(this.serviceHost + url, { headers }).pipe(
        catchError(this.handleError)
      );
    }
    

  // Get FUNCTION
  getfunction(url: string, id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.serviceHost}${url}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // POST FUNCTION
  postFunction(url: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.serviceHost + url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

   // Delete FUNCTION
   deleteFunction(url: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.serviceHost}${url}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  DeleteFunction(url: string, id: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.serviceHost}${url}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  // GET FUNCTION with Token
  getWithToken(url: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).set('Authorization', `Bearer ${token}`).set('Tag', 'web');
    return this.http.get(this.serviceHost + url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(errorMessage);
  }
}
