import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZorroAntdModule } from '../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-401',
  standalone: true,
  imports: [SharedModule, NgZorroAntdModule],
  templateUrl: './401.component.html',
  styleUrl: './401.component.scss'
})
export class Exception401Component {
  constructor(private router: Router) {

  }

  login() {
    this.router.navigate(['/auth']);
  }

}
