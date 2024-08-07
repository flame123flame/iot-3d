import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgZorroAntdModule } from './shared/ng-zorro-antd.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgZorroAntdModule],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
