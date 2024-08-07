import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZorroAntdModule } from '../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [SharedModule, NgZorroAntdModule],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss'
})
export class Exception404Component {
  constructor(private router: Router) { }
  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home page or any other appropriate page
  }
}