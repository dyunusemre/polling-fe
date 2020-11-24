import { Answer } from './answer';

export class Question {
    id: string;
    question: string;
    status: string;
    answers: Answer[];
}