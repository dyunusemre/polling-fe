import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Answer } from '../model/answer';
import { Question } from '../model/question';
import { AuthService } from '../services/auth.service';
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;

  isAuth = false;
  isAdmin = false;
  private userSub: Subscription;
  selectedOption: any;
  questions: Question[] = [];
  isLoading = false;
  isVoteSending = false;
  modalOpened = false;

  answers = [
  ];

  constructor(private questionService: QuestionService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('question load' + this.isAdmin);
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.isAuth = true;
        this.isAdmin = user.isAdmin;
      }
    });

    this.isLoading = true;
    this.questionService.getAllQuestion().subscribe(
      response => {
        this.isLoading = false;
        this.questions = response;
      }
    );
  }

  answerForm: FormGroup  =  new  FormGroup({
    'answer': new FormControl()
  });

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question.id).subscribe(response => {
      let index = this.questions.indexOf(question);
      this.questions.splice(index, 1);
    });
  }

  updateQuestion() {

  }
}
