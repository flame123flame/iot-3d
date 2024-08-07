import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThaiDateTimePipe } from './pipes/thai-date-time.pipe';
import { ThaiDatePipe } from './pipes/thai-date.pipe';
import { ThaiMoneyPipe } from './pipes/thai-money.pipe';
import { PhoneValidatorDirective } from './directives/phone-number-format.directive';
import { NullOrEmptyToDashPipe } from './pipes/empty-to-dash.pipe';


const coreModules: any[] = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];
const additionalModules: any[] = [];
const pipes: any[] = [ThaiDateTimePipe,NullOrEmptyToDashPipe, ThaiDatePipe, ThaiMoneyPipe];
const directives: any[] = [PhoneValidatorDirective];
@NgModule({
  declarations: [...pipes, ...directives],
  imports: [...coreModules, ...additionalModules],
  exports: [...coreModules, ...additionalModules, ...pipes, ...directives],
})
export class SharedModule { }
