import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/model/question';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-waiting-questions',
  templateUrl: './waiting-questions.component.html',
  styleUrls: ['./waiting-questions.component.css']
})
export class WaitingQuestionsComponent implements OnInit {

  private userSub : Subscription;
  waitingQuestions: Question[] = [];
  isLoading = false;

  constructor(private questionService: QuestionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub  = this.authService.user.subscribe();

    this.isLoading = true;
    this.questionService.getWaitingQuestions().subscribe(
      response => {
        this.isLoading = false;
        this.waitingQuestions = response;
      }
    );
  }

  approveQuestion(question: Question){
    let index = this.waitingQuestions.indexOf(question);
    this.waitingQuestions.splice(index, 1);
    this.questionService.approveQuestion(question.id);
  }

}
