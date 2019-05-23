import {QuizActions} from './quiz.actions';
import {quizReducer} from './quiz.reducer';
import {QuizState} from './store';
import {Quiz} from '../entities/quiz';

var deepFreeze = require('deep-freeze');

describe('quiz reducer tests', () => {


  // each it block is a test case.
  it('should set state to true when logging in', () => {
    let startState = {isLoggedIn: undefined, quizzes: [], isLoading: false};
    deepFreeze(startState);
    let actionObj = {
      type: QuizActions.LOG_IN, payload: true
    };
    let newStateObj = quizReducer(startState, actionObj);
    expect(newStateObj).toEqual({isLoggedIn: true, quizzes: [], isLoading: false});
  });

  it('should create new quiz ', () => {
    // Arrange - Act - Assert

    // Arrange
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = {title: 'Test quiz', questions: []} as Quiz;
    let actionObj = {type: QuizActions.CREATE_QUIZ, payload: quiz};

    // Act
    let newStateObj = quizReducer(startState, actionObj);

    // Assert (expect)
    expect(newStateObj.quizzes.length).toBe(1);
    expect(newStateObj.quizzes[0].title).toBe('Test quiz');
  });
});
