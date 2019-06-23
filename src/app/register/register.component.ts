import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });

  }


  register(): void {
    if (this.registerForm.valid) {
      this.snackBar.open('Welcome, ' +
        this.registerForm.controls.firstname.value + ' ' + this.registerForm.controls.lastname.value + '. You may now login!', 'Close', {
        duration: 2000,
      });

      this.router.navigate(['/home/login'])
    } else {
      this.snackBar.open('Please fill in all the fields', 'Close', {
        duration: 2000,
      });
    }

  }

}
