import {Component, OnInit} from '@angular/core';
import {Quiz} from '../entities/quiz';
import {ActivatedRoute} from '@angular/router';
import {QuizActions} from '../redux/quiz.actions';
import {QuizApiService} from '../api/quiz-api.service';
import {Input} from '@angular/core/src/metadata/directives';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../redux/store';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {
  quiz: Quiz;

  constructor(private route: ActivatedRoute, private api: QuizApiService, private NgRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    // Get id from url

    const id = this.route.snapshot.paramMap.get('id');
    // Subscribe to quizzes state and find the quiz with matching id
    this.NgRedux.select(state => state.quizzes).subscribe(result => {
      this.quiz = result.quizzes.find(quiz => quiz._id == id);

    });

  }

}
