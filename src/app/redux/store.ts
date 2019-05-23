import {routerReducer} from '@angular-redux/router';
import {combineReducers} from 'redux';
import {quizReducer} from './quiz.reducer';
import {Quiz} from '../entities/quiz';


// All Quiz states
export class QuizState {
  isLoggedIn: boolean;
  quizzes: Quiz[];
  isLoading: boolean;
}

// All states
export class AppState {
  //Quiz states
  quizzes?: QuizState;
}

export const rootReducer = combineReducers<AppState>({
  quizzes: quizReducer,

  router: routerReducer
} as any);

