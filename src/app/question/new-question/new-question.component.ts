import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {


  questionForm: FormGroup = new FormGroup({
    'questionHeader': new FormGroup({
      'questionText': new FormControl()
    }),
    'answers': new FormArray([new FormControl('')])
  });
  get answerArr() {
    return (this.questionForm.get('answers') as FormArray);
  }

  isAdmin: boolean = false;
  isAuth: boolean = false;
  @Input() questions: Array<Question> = [];
  modalOpened: boolean = false;

  constructor(private questionService: QuestionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.isAuth = true;
        this.isAdmin = user.isAdmin;
      }
    });
  }

  onAddOption() {
    const control = new FormControl(null);
    this.answerArr.push(control);
  }

  resetModal() {
    this.questionForm = new FormGroup({
      'questionHeader': new FormGroup({
        'questionText': new FormControl()
      }),
      'answers': new FormArray([new FormControl('')])
    });
    this.questionForm.reset();
  }

  addQuestion(questionForm: FormGroup) {
    let status = this.isAdmin ? "A" : "W";
    let newQuestion: Question = new Question();
    let answer: Array<Answer> = [];
    newQuestion = {
      id: null,
      status: status,
      question: questionForm.controls.questionHeader.get('questionText').value,
      answers: answer
    };
    var index = 1 ;
    questionForm.controls.answers.value.forEach(element => {
      answer.push({
        optionNo: index,
        option: element,
        answerCount: 0
      });
      index++;
    });
    if (status == "A") {
      this.questions.push(newQuestion);
    }
    this.questionService.createQuestion(newQuestion).subscribe(response => {
      document.getElementById('closeModalButton').click();
    });
  }

}
