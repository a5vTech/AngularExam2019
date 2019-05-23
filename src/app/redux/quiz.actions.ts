import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from './store';
import {Quiz} from '../entities/quiz';
import {QuizApiService} from '../api/quiz-api.service';

@Injectable({providedIn: 'root'})
export class QuizActions {
  constructor(
    private ngRedux: NgRedux<AppState>, private api: QuizApiService) {
  }

  static LOG_IN: string = 'LOG_IN';
  static CREATE_QUIZ: string = 'CREATE_QUIZ';
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ';
  static DELETE_QUIZ: string = 'DELETE_QUIZ';

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';

  createQuiz(quiz: Quiz): void {
    console.log('Added new quiz');
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ,
      payload: quiz
    });


  }

  // Dispatches an action to the reducer (With type and payload)
  setLoggedIn(isLoggedIn: boolean): void {
    console.log('IS LOGGED IN : ' + isLoggedIn);
    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    });
  }

  getQuizzes(): void {
    this.ngRedux.dispatch({type: QuizActions.GET_QUIZZES_LOADING}); // start a "spinner"

    // call the ws
    this.api.getAllQuizzes().subscribe(quizzes => {
      console.log(quizzes);
      console.log(quizzes.filter(quiz => quiz.customerId === 'jtp'));
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'jtp')
      });
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      });
    });

    // this.ngRedux.dispatch({type: QuizActions.GET_QUIZZES_SUCCESS}) // We do not wait for the reponse
  }
}
