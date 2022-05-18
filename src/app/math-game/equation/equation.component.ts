import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpressionEvaluator } from '../expression-evaluator';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup({
    answer: new FormControl('')
  })
  equation: string = '';
  numbers: number[] = [];
  operators: string[] = [];
  validOperators: string[] = ['+', '-', '*']

  constructor() { }

  ngOnInit(): void {
    this.generateEquation(5)
    console.log(this.equation);
    let infix = ExpressionEvaluator.infixToPostfix(this.equation);
    console.log(infix);
    console.log(ExpressionEvaluator.evaluateInfixExpression(infix));
  }

  generateEquation(n: number) {
    this.generateNumbers(n);
    this.generateOperators(n-1);
    for (let i = 0; i < n; i++) {
      this.equation += this.numbers[i];
      this.equation += ' '
      if (i < n - 1) {
        this.equation += this.operators[i];
        this.equation += ' '
      }
    }
  }

  onKeyUp(event: any) {
    let input = event.target.value;
    input = parseFloat(input);

    let result = ExpressionEvaluator.evaluate(this.equation);
    
    if (input !== result) {
      this.mathForm.setErrors({ invalidInputResult: true })
    } else {
      this.mathForm.setErrors(null);
    }


  }

  generateNumbers(n: number) {
    for (let i = 0; i < n; i++) {
      this.numbers.push(this.randomNumber());
    }
  }

  generateOperators(n: number) {
    for (let i = 0; i < n; i++) {
      this.operators.push(this.randomSymbol());
    }
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  randomSymbol() {
    let rand = Math.floor(Math.random() * 3);
    return this.validOperators[rand]
  }

}
