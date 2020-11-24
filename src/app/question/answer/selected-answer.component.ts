import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/model/answer';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'selected-app-answer',
  templateUrl: './selected-answer.component.html',
  styleUrls: ['./selected-answer.component.css']
})
export class SelectedAnswerComponent implements OnInit {

  @Input() answers: Answer[];
  @Input() questionId: string;
  isVoteSending: boolean = false;
  isSelected: number = 0;
  userId: string;
  isAlreadyAnswered: boolean = false;

  constructor(private questionService: QuestionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user  => {
      if(user){
        this.userId = user.id;
      }
    });
    this.isAnswerSent();
  }

  isAnswerSent(){
    this.questionService.checkAnswers(this.questionId,this.userId).subscribe(
      resp => {
        this.isAlreadyAnswered = resp.optionNo != 0;
        this.isSelected = resp.optionNo;
      }
    );
  }

  sendAnswer(questionId: string, isSelected: number) {
    if(isSelected==0){
      return;
    }
    console.log(questionId, isSelected);
      this.isVoteSending = true;
      this.questionService.sendAnswer(questionId, isSelected, this.userId).subscribe(res => {
        this.isVoteSending = false;
        this.isAlreadyAnswered = isSelected != 0;
        this.isSelected = isSelected;
      });
  }

}
