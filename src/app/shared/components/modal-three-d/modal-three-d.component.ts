import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ModelThreeDService } from './model-three-d.service';

@Component({
  selector: 'app-modal-three-d',
  templateUrl: './modal-three-d.component.html',
  styleUrls: ['./modal-three-d.component.scss'],
  standalone: true,
  imports: [SharedModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalThreeDComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: ModelThreeDService) {
  }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);

  }


}
