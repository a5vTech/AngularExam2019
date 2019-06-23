import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {QuizActions} from '../redux/quiz.actions';
import {AuthService} from '../auth/auth.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
              private router: Router, private quizActions: QuizActions,
              private auth: AuthService,
              private NgRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    );
  }

  onSubmit(): void {
    this.snackBar.open('One second, logging in..', 'Close', {
      duration: 2000,
    });

    //console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.quizActions.setLoggedIn(true);
      // Send the data to the server to verify the user login
      // navigate after successful login.
      if (this.loginForm.value.username === 'admin') {
        //log in as admin
        this.auth.isAdmin = true;

      }
      console.log('First');
      // Subscribe to authService login
      this.auth.login().subscribe(res => {
        this.router.navigate(['portal/display-quizzes']);
      });
    }

  }

}
