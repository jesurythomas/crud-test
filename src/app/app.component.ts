import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from './shared/crud.service';
import { Student } from './shared/student';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form = this.fb.group({
    $key: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    mobileNumber: ['', Validators.required],
  });

  students$ = [];
  editing = false;
  editingIndex!: number;

  constructor(private fb: FormBuilder, private crud: CrudService) {}

  ngOnInit(): void {
    this.crud.getStudents().subscribe((val) => {
      this.students$ = val;
    });
  }

  onEdit(index: any) {
    this.editing = true;
    this.editingIndex = index;
  }

  editComplete(value: any) {
    this.editing = value;
    this.editingIndex = null;
  }

  get f() {
    return this.form.controls;
  }
}
