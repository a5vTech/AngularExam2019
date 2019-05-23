import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question, Quiz} from '../entities/quiz';
import {ActivatedRoute} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';
import {until} from 'selenium-webdriver';
import elementTextContains = until.elementTextContains;

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  updateQuizGroup: FormGroup;
  quiz: Quiz;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private NgRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.NgRedux.select(state => state.quizzes).subscribe(res => {
      this.quiz = res.quizzes.find(quiz => quiz._id == id);
    });

    this.updateQuizGroup = this.fb.group({
      title: [this.quiz.title],
      questions: this.fb.array([])
    });

    let index = 0;
    this.quiz.questions.forEach(element => {
      const questions = this.updateQuizGroup.controls.questions as FormArray;
      questions.push(this.fb.group({
        title: [element.title],
        options: this.fb.array([])
      }));

      // @ts-ignore
      const options = questions.controls[index].controls.options as FormArray;

      this.quiz.questions[index].options.forEach(option => {
        options.push(this.fb.group({
          answer: [option.answer],
          correct: [option.correct]
        }));
      });
      index++;

    });


  }


  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.updateQuizGroup.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    // console.log(options);
    questions.push(question);
  }

  createNewOption(questionIndex: number) {
    const option = this.createNewOptionGroup();
    const questions = this.updateQuizGroup.controls.questions as FormArray;
    // console.log(questions);
    const options = (<FormArray> questions.controls[questionIndex]).controls['options'] as FormArray;
    // console.log(options);
    options.push(option);
  }

  createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  updateQuiz() {


  }

}
