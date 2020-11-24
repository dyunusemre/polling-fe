import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { Answer } from '../model/answer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MDYxMjUzNDksImV4cCI6MTYwNzI4ODQwMH0.i8D6byBHR9gvwrqPIv6gUERuNQXHtgRd1J8bvxzW6Xc';
  private url = 'http://localhost:8080/api/question';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllQuestion() {
    return this.httpClient.get<Question[]>(this.url + '/poll-questions');
  }

  getWaitingQuestions() {
    return this.httpClient.get<Question[]>(this.url + '/poll-waiting-questions');
  }

  getAllQuestionWithAnswers() {
    return this.httpClient.get<Question[]>(this.url + '/poll-answer');
  }

  createQuestion(question: Question) {
    return this.httpClient.post<Question>(this.url + '/create-question', question);
  }

  update(question: Question) {
    return this.httpClient.patch<Question>(this.url + '/modify-question', question);
  }

  checkAnswers(questionId: string, userId: string) {
    return this.httpClient.post<any>(this.url + '/retrive-answer', {
      'questionId': questionId,
      'userId': userId
    });
  }

  sendAnswer(questionId: string, optionNo: number, userId: string) {
    return this.httpClient.put(this.url + '/send-answer',
      {
        'questionId': questionId,
        'userId': userId,
        'optionNo': optionNo
      });
  }

  approveQuestion(id: string) {
    return this.httpClient.post(this.url + '/approve-question', {
      'questionId': id
    }).subscribe(res => { }, error => {
      console.log(error);
    });
  }

  deleteQuestion(id: string) {
    return this.httpClient.delete<any>(this.url + '/delete-question/' + id);
  }
}
