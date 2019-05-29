import {Pipe, PipeTransform} from '@angular/core';
import {Quiz} from '../entities/quiz';

@Pipe({
  name: 'quizPipe' //used when I apply the pipe(filter)
})
export class QuizPipe implements PipeTransform {


  transform(quizzes: Quiz[], search?: any): any {

    if (search === undefined) {
      return quizzes;
    }


    return quizzes.filter(quiz => quiz.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 && quiz.title.length > 1);
  }

}
