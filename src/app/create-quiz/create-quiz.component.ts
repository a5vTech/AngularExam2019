import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {QuizActions} from '../redux/quiz.actions';
import {QuizApiService} from '../api/quiz-api.service';
import {Quiz} from '../entities/quiz';
import {Gender} from '../entities/user';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private quizactions: QuizActions,
              private api: QuizApiService) {
  }

  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });

    this.createNewQuestion();
  }


  saveQuiz() {
    let quiz = this.createQuiz.value as Quiz;
    quiz.user = {
      _id: '1',
      username: 'Jesper',
      email: 'jesper2604@gmail.com',
      gender: Gender.MALE,
      birthDate: undefined
    };
    // Call api and save quiz
    this.api.createQuiz(quiz).subscribe(quizFromWs => {
      // Save quiz locally to redux with the quiz returned from WS (Includes the generated id)
      this.quizactions.createQuiz(quizFromWs);
      this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      // Code to handle WS Error here
      console.log('Something went wrong: ' + error);
    });

  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    // console.log(options);
    questions.push(question);
  }

  createNewOption(questionIndex: number) {
    const option = this.createNewOptionGroup();
    const questions = this.createQuiz.controls.questions as FormArray;
    // console.log(questions);
    const options = (<FormArray> questions.controls[questionIndex]).controls['options'] as FormArray;
    // console.log(options);
    options.push(option);
  }

  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }
}
