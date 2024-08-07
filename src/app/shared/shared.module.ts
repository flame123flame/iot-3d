import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PhoneValidatorDirective } from './directives/phone-number-format.directive';
import { NullOrEmptyToDashPipe } from './pipes/empty-to-dash.pipe';


const coreModules: any[] = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];
const additionalModules: any[] = [];
const pipes: any[] = [NullOrEmptyToDashPipe];
const directives: any[] = [PhoneValidatorDirective];
@NgModule({
  declarations: [...pipes, ...directives],
  imports: [...coreModules, ...additionalModules],
  exports: [...coreModules, ...additionalModules, ...pipes, ...directives],
})
export class SharedModule { }
