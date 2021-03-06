import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'schoolPrincipleClientApp';
  public students: Student[];
  public editStudent: Student;
  public deleteStudent: Student;

  constructor(private studentService: StudentService) {

  }
  ngOnInit(): void {
    this.getStudents();
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (respone: Student[]) => {
        this.students = respone;
        console.log(this.students)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form').click();
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Student) => {
        console.log('add student.....')
        console.log(response)
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public openModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal')
    }
    if (mode === 'edit') {
      this.editStudent = student;
      button.setAttribute('data-target', '#editStudentModal')
    }
    if (mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal')
    }
    container.appendChild(button);
    button.click();
  }
  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudents(student).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
  public onDeleteStudent(studentId: number): void {
    this.studentService.deleteStudents(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchStudent(key: string): void {
    console.log('Key is ')
    console.log(key)
    const result: Student[] = [];
    for (const student of this.students) {
      if (student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(student)
        console.log(result)
      }
    }
    this.students = result;
    if (result.length === 0 || !key) {
      this.getStudents();
    }
  }
}
