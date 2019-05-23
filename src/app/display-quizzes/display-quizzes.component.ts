import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';
import {QuizActions} from '../redux/quiz.actions';
import {Quiz} from '../entities/quiz';

@Component({
  selector: 'app-display-quizzes',
  templateUrl: './display-quizzes.component.html',
  styleUrls: ['./display-quizzes.component.scss']
})
export class DisplayQuizzesComponent implements OnInit {
  quizzes: Quiz[];
  isLoading: boolean;
  userSearch: string;

  constructor(private ngRedux: NgRedux<AppState>, private quizActions: QuizActions) {
  }

  ngOnInit() {
    //Subscribe to the quizzes part of the store
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });

    this.quizActions.getQuizzes();
  }

  handleQuizClicked(quiz: Quiz): void {
    // Do whatever I want to handle the event.
    console.log(this.userSearch);
    // this.userSearch = 'Hi there'
    console.log(quiz);
  }

}
