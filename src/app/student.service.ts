import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<any>(`${this.apiServiceUrl}/student/all`);
  }
  public addStudents(student: Student): Observable<Student> {
    return this.http.post<any>(`${this.apiServiceUrl}/student/add`, student);
  }
  public updateStudents(student: Student): Observable<Student> {
    return this.http.put<any>(`${this.apiServiceUrl}/student/add`, student);
  }
  public deleteStudents(studentid: number): Observable<void> {
    return this.http.delete<any>(`${this.apiServiceUrl}/student/delete/${studentid}`);
  }

}
