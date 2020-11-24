import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question';
import { AuthService } from '../services/auth.service';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  isAuth = false;
  isAdmin = false;
  isLoading =  false;
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user  => {
      if(user){
        this.isAuth = true;
        this.isAdmin = user.isAdmin;
      }
    });
    this.isLoading =  true;
    this.questionService.getAllQuestionWithAnswers().subscribe(
      response=> {
        this.isLoading = false;
        this.questions =  response;
      }
    );
  }

}
