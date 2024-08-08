import { Component } from '@angular/core';
import { EngineComponent } from '../../../../shared/components/engine/engine.component';
import { NgZorroAntdModule } from '../../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [EngineComponent,NgZorroAntdModule,SharedModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
