import { Component } from '@angular/core';
import { EngineComponent } from '../../../../shared/components/engine/engine.component';
import { NgZorroAntdModule } from '../../../../shared/ng-zorro-antd.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ThreejsViewerComponent } from '../../../../shared/components/threejs-viewer/threejs-viewer.component';
import { ModalThreeDComponent } from '../../../../shared/components/modal-three-d/modal-three-d.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [EngineComponent,ThreejsViewerComponent,NgZorroAntdModule,SharedModule, ModalThreeDComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
