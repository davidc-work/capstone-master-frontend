import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as testData from './test.json';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testData: any;
  currentQuestion: number = 0;
  answers: any;
  selectedAnswer: number | undefined = undefined;
  correctAnswer: number | undefined = undefined;
  showAnswers: boolean = false;

  constructor(private router: Router) {
    this.testData = Array.from(testData);
  }

  setQuestion(i: number) {
    if (i < 0 || i >= this.testData.length) return ;

    this.currentQuestion = i;
    this.selectedAnswer = this.answers[i];
    this.correctAnswer = this.testData[this.currentQuestion].correctAnswer;
  }

  setAnswer(i: number) {
    var answers = this.getAnswers();
    answers[this.currentQuestion] = i;

    this.answers = answers;
    this.selectedAnswer = i;
    localStorage.setItem('answers', JSON.stringify(answers));

    this.showAnswers = false;
  }

  resetAnswers() {
    const answers = Array(this.testData.length).fill(0).map(x => undefined);
    localStorage.setItem('answers', JSON.stringify(answers));

    return answers;
  }

  getAnswers() {
    var answers = JSON.parse(<string>localStorage.getItem('answers'));
    if (!answers) answers = this.resetAnswers();
    if (answers.length != this.testData.length) answers = this.resetAnswers();

    return answers;
  }

  submit() {
    if (this.showAnswers) return ;
    const msg = 'Submit test?' + (this.answers.includes(null) ? ' Not all questions have been answered!' : '');
    if (confirm(msg)) {
      this.setQuestion(0);
      this.showAnswers = true;
    }
  }

  home() {
    this.router.navigateByUrl('/user-profile');
  }

  ngOnInit(): void {
    this.answers = this.getAnswers();
    this.selectedAnswer = this.answers[this.currentQuestion];
    this.correctAnswer = this.testData[this.currentQuestion].correctAnswer;

    console.log(this.correctAnswer);
  }

}
