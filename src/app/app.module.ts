import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDividerModule,
  MatGridListModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {AppState, rootReducer} from './redux/store';
import {PortalComponent} from './portal/portal.component';
import {DisplayQuizzesComponent} from './display-quizzes/display-quizzes.component';
import {QuizComponent} from './quiz/quiz.component';
import {HttpClientModule} from '@angular/common/http';
import {DisplayQuizComponent} from './display-quiz/display-quiz.component';
import {CreateQuizComponent} from './create-quiz/create-quiz.component';
import {QuizPipe} from './pipes/quiz.pipe';
import { UpdateQuizComponent } from './update-quiz/update-quiz.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PortalComponent,
    DisplayQuizzesComponent,
    QuizComponent,
    DisplayQuizComponent,
    CreateQuizComponent,
    QuizPipe,
    UpdateQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    MatChipsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<AppState>,
              private devTool: DevToolsExtension,
              private ngReduxRouter: NgReduxRouter,) {

    // this.ngRedux.configureStore(rootReducer, {});


    this.ngRedux.configureStore(rootReducer, {}, [], [devTool.isEnabled() ? devTool.enhancer() : f => f]);
    ngReduxRouter.initialize(/* args */);


  }

}
