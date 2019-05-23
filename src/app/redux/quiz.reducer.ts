import {tassign} from 'tassign';
import {QuizState} from './store';
import {QuizActions} from './quiz.actions';

const INITIAL_STATE: QuizState = {isLoggedIn: false, quizzes: [], isLoading: false};


export function quizReducer(state: QuizState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case QuizActions.LOG_IN:
      console.log(action);
      return tassign(state, {isLoggedIn: action.payload});

    case QuizActions.CREATE_QUIZ:
      console.log(action);
      const newState = [...state.quizzes, action.payload];
      return tassign(state, {quizzes: newState});

    case QuizActions.UPDATE_QUIZ:
      //new quiz object
      //TODO : Create this method
      return tassign(state, {quizzes: [...state.quizzes.splice(action.payload._id, 1, action.payload)]});

      break;

    case QuizActions.DELETE_QUIZ:
      // action payload is id of quiz
      const newArray = state.quizzes.filter(quiz => quiz._id != action.payload);
      //TODO :  CREATE THIS METHOD
      return tassign(state, {quizzes: newArray});
      break;

    case QuizActions.GET_QUIZZES_LOADING:
      return tassign(state, {isLoading: true});

    case QuizActions.GET_QUIZZES_SUCCESS:
      return tassign(state, {isLoading: false, quizzes: action.payload});


    case QuizActions.GET_QUIZZES_FAILED:
      return tassign(state, {isLoading: false});
    default:
      return state;
  }
}
