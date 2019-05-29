import {QuizPipe} from './quiz.pipe';
import {TestBed} from '@angular/core/testing';
import {Quiz} from '../entities/quiz';

describe('QuizPipe', () => {
  // it('create an instance', () => {
  //   const pipe = new QuizPipe();
  //   expect(pipe).toBeTruthy();
  // });

  const pipe = new QuizPipe();
  const quizzes: Quiz[] = [{
    _id: '1',
    title: 'Title 1',
    questions: [{
      title: 'Question ',
      options: [{
        answer: 'answer',
        correct: true
      },
        {
          answer: 'answer2',
          correct: false
        }]
    }],
    customerId: 'jtp'
  },
    {
      _id: '2',
      title: 'Title 2',
      questions: [{
        title: 'Question ',
        options: [{
          answer: 'answer',
          correct: true
        },
          {
            answer: 'answer2',
            correct: false
          }]
      }],
      customerId: 'jtp'
    },
    {
      _id: '3',
      title: 'Title 3',
      questions: [{
        title: 'Question ',
        options: [{
          answer: 'answer',
          correct: true
        },
          {
            answer: 'answer2',
            correct: false
          }]
      }],
      customerId: 'jtp'
    },
    {
      _id: '4',
      title: 'Title 4',
      questions: [{
        title: 'Question ',
        options: [{
          answer: 'answer',
          correct: true
        },
          {
            answer: 'answer2',
            correct: false
          }]
      }],
      customerId: 'jtp'
    }];

  beforeEach(() => {


  });

  TestBed.configureTestingModule({
    declarations: [
      QuizPipe
    ],
  });


  it('All Quizzes matches search \"\"', () => {

    let result = pipe.transform(quizzes, '');
    expect(result.length).toBe(quizzes.length);


  });

  it('Search title 1 \"\"', () => {
    let result = pipe.transform(quizzes, 'Title 1');
    expect(result.length).toBe(1);

  });


});

