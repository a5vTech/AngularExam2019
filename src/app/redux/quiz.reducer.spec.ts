import {QuizActions} from './quiz.actions';
import {quizReducer} from './quiz.reducer';
import {QuizState} from './store';
import {Quiz} from '../entities/quiz';
import {del} from 'selenium-webdriver/http';
import {strictEqual} from 'assert';

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


  it('should delete a quiz', () => {
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = {title: 'Test quiz', questions: []} as Quiz;
    let delActionObj = {type: QuizActions.DELETE_QUIZ, payload: quiz};
    let createActionObj = {type: QuizActions.CREATE_QUIZ, payload: quiz};

    let newStateObj = quizReducer(startState, createActionObj);

    let x = quizReducer(newStateObj, createActionObj);

    expect(x.quizzes.length).toBe(2);
    quizReducer(x, delActionObj);
    expect(newStateObj.quizzes.length).toBe(1);

  });


  it('should update a quiz', () => {
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = {title: 'Test quiz', questions: []} as Quiz;
    let createActionObj = {type: QuizActions.CREATE_QUIZ, payload: quiz};
    let newStateObj = quizReducer(startState, createActionObj);
    quiz = {title: 'UPDATED TEST QUIZ', questions: []} as Quiz;
    let updateActionObj = {type: QuizActions.UPDATE_QUIZ, payload: quiz}
    let state2 = quizReducer(newStateObj, updateActionObj);

    expect(newStateObj.quizzes[0].title).not.toEqual(state2.quizzes[0].title)
  })
});
