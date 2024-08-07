import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgZorroAntdModule } from '../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-403',
  standalone: true,
  imports: [SharedModule, NgZorroAntdModule],
  templateUrl: './403.component.html',
  styleUrl: './403.component.scss'
})
export class Exception403Component {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
