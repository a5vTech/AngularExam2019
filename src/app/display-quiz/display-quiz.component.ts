import {Component, OnInit} from '@angular/core';
import {Quiz} from '../entities/quiz';
import {ActivatedRoute} from '@angular/router';
import {QuizActions} from '../redux/quiz.actions';
import {QuizApiService} from '../api/quiz-api.service';
import {Input} from '@angular/core/src/metadata/directives';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';
import {log} from "util";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {
  quiz: Quiz;
  correctAnswers: number = 0;
  clickedOptions: any = new Set();

  constructor(private route: ActivatedRoute, private api: QuizApiService, private NgRedux: NgRedux<AppState>, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    // Get id from url

    const id = this.route.snapshot.paramMap.get('id');
    // Subscribe to quizzes state and find the quiz with matching id
    this.NgRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id == id);

    });

  }


  checkCorrectAnswer(question, option) {
    // for (let i = 0; i < question.options.length; i++) {
    //   this.clickedOptions.add(question.options[i]);
    // }
    console.log(option.answer);
    console.log(option.correct);
    if (this.clickedOptions.has(option)) {
      console.log('Already clicked this!');
    } else {
      this.clickedOptions.add(option);
      console.log(this.clickedOptions);
      if (option.correct) {
        this.correctAnswers += 1;
        this.snackbar.open("You have clicked the correct answer!", '', {
          duration: 1000,
        });
      } else {
        this.snackbar.open("You have clicked the wrong answer!", '', {
          duration: 1000,
        });
      }
    }

    for (let i = 0; i < question.options.length; i++) {
      this.clickedOptions.add(question.options[i]);
    }


  }

}
