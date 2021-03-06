import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PortalComponent} from './portal/portal.component';
import {DisplayQuizzesComponent} from './display-quizzes/display-quizzes.component';
import {DisplayQuizComponent} from './display-quiz/display-quiz.component';
import {CreateQuizComponent} from './create-quiz/create-quiz.component';
import {AuthGuard} from './auth/auth.guard';
import {UpdateQuizComponent} from './update-quiz/update-quiz.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [{path: '', redirectTo: 'home/login', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},

    ]
  },
  {
    path: 'portal', component: PortalComponent, canActivate: [AuthGuard], children: [
      {path: 'display-quizzes', component: DisplayQuizzesComponent},
      {path: 'display-quiz/:id', component: DisplayQuizComponent},
      {path: 'create-quiz', component: CreateQuizComponent},
      {path: 'update-quiz/:id', component: UpdateQuizComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
