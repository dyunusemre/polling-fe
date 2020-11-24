import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgModel } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() questions: Question[];

  closeResult: string;

  questionForm: FormGroup = new FormGroup({
    'questionHeader': new FormGroup({
      'questionText': new FormControl()
    }),
    'answers': new FormArray([])
  });

  get answerArr() {
    return (this.questionForm.get('answers') as FormArray);
  }

  constructor(private questionService: QuestionService ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.questionForm.patchValue({
      'questionHeader': {
        'questionText': this.question.question,
      }
    });
    this.question.answers.forEach(answer => {
      const control = new FormControl(answer.option);
      (this.questionForm.get('answers') as FormArray).push(control);
    })
  }

  openModal(content){
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onAddOption() {
    const control = new FormControl(null);
    this.answerArr.push(control);
  }

  updateQuestion(questionForm: FormGroup) {
    let newQuestion: Question = new Question();
    let answer: Array<Answer> = [];
    newQuestion = {
      id: this.question.id,
      status: 'A',
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
     console.log(newQuestion);
     this.modalService.dismissAll();
     let indexQuestion = this.questions.indexOf(this.question);
     this.questions[indexQuestion] = newQuestion;
     this.questionService.update(newQuestion).subscribe();
  }
} 
