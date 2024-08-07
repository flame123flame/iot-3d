import { Component } from '@angular/core';
import { NgZorroAntdModule } from '../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../shared/shared.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-500',
  standalone: true,
  imports: [SharedModule, NgZorroAntdModule],
  templateUrl: './500.component.html',
  styleUrl: './500.component.scss'
})
export class Exception500Component {
  constructor(private location: Location, private router: Router) { }
  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/home']); // Navigate to the home page or any other appropriate page
  }
}
