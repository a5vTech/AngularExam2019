import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../entities/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteQuizClicked() {
    this.quizClicked.emit(this.quiz);
  }
}
