import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { WaitingQuestionsComponent } from './question/waiting-questions/waiting-questions.component';
import { EditQuestionComponent } from './question/edit-question/edit-question.component';
import { SelectedAnswerComponent } from './question/answer/selected-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    QuestionComponent,
    AnswerComponent,
    LoadingSpinnerComponent,
    NewQuestionComponent,
    WaitingQuestionsComponent,
    EditQuestionComponent,
    SelectedAnswerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home/question', component: QuestionComponent, canActivate: [AuthGuard]  },
      { path: 'home/answer', component: AnswerComponent, canActivate: [AuthGuard]  },
      { path: 'home/waiting-questions', component: WaitingQuestionsComponent, canActivate: [AuthGuard]  }


    ]),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent,]
})
export class AppModule { }
