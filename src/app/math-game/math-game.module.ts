import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathGameRoutingModule } from './math-game-routing.module';
import { EquationComponent } from './equation/equation.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquationComponent
  ],
  imports: [
    CommonModule,
    MathGameRoutingModule,
    ReactiveFormsModule
  ]
})
export class MathGameModule { }
