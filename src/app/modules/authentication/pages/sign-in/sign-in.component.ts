import { Component } from '@angular/core';
import { EngineComponent } from '../../../../shared/components/engine/engine.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [EngineComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
